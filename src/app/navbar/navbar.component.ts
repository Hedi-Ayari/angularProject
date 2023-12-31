import { UserServiceService } from './../services/user-service.service';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { NavbarService } from '../services/navbar.service';
import { Subscription } from 'rxjs';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy{

  showNavbar: boolean = true;
  subscription: Subscription;
  authenticated: any = localStorage.getItem('isLoggedIn');
  userName :string = "";

  constructor(private userService: UserServiceService, private router: Router, private navbarService: NavbarService, public messageService: MessageService) {
    this.subscription = this.navbarService.showNavbar.subscribe((value) =>{
        this.showNavbar = value;
    });
  }

  showMessage(msg: string) {
    this.messageService.add({ key: 'msg', severity: 'info', summary: 'Reminder', detail: msg, life: 20000 });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  items: MenuItem[] = [];
  userItems: MenuItem[] = [];
  activeItem: MenuItem ;

  login(){
    this.router.navigate(['./Login']);
  }

  logout(){
    localStorage.setItem('isLoggedIn', 'false');

    this.router.navigate(['./login']);

    this.userService.logout().subscribe(
      (data) =>{
        this.authenticated = false;
        this.router.navigate(['./login']);
      })
  }


  ngOnInit() {
    Emitters.authEmitter.subscribe(
      (data: boolean) =>{
        this.authenticated = data;
        if(this.authenticated){
          this.userService.getUser().subscribe(
            (data) =>{
              this.userName = (data.name).toString();
              if(data.state == "Non valid"){
                this.showMessage("Your account is not validated yet.");
              }
              if(data.role == "pharmacy"){
                this.userItems = [
                  { label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: './' },
                  {
                    label: 'Purchase history', icon: 'pi pi-fw pi-history',
                  },
                  { label: 'Logout', icon: 'pi pi-fw pi-power-off', command: () => { this.logout(); }}
                ];
              } else if(data.role == "admin"){
                this.userItems = [
                  { label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: './' },
                  {
                    label: 'Purchase history', icon: 'pi pi-fw pi-history',
                  },
                  { label: 'Logout', icon: 'pi pi-fw pi-power-off', command: () => { this.logout(); }}
                ];
              }
            }
            , (error) =>{console.log(error);})
        }
      },
      (error) =>{
        console.log(error);
      }
    )

    this.items = [
      { label: 'Home Page', icon: 'pi pi-fw pi-home', routerLink: './' },
      {
        label: 'management article', icon: 'pi pi-fw pi-folder', items: [
          { label: 'Ajout D un article', routerLink: './add' },
          { label: 'mise a jour des article', routerLink: './update' }
        ]
      },
      { label: '', icon: '', routerLink: './', disabled: true }
    ];

    this.activeItem = this.items[3];
  }

}
