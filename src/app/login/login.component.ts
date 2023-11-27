import { UserServiceService } from './../services/user-service.service';
import { NavbarService } from './../services/navbar.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false; // Flag to track login status

  constructor(private userService: UserServiceService, private messageService: MessageService, private router: Router, private navbarService: NavbarService) { }

  showError(msg: string) {
    this.messageService.add({ key: 'msg', severity: 'error', summary: 'Error', detail: msg });
  }

  showWarn() {
    this.messageService.add({ key: 'msg', severity: 'warn', summary: 'Warning', detail: 'You have to fill the form first' });
  }

  register() {
    // Navigate to the register page
    this.router.navigate(['/Register']); // Replace '/register' with the actual route path
  }

  home() {
    this.router.navigate(['../']);
  }

  login(f: NgForm) {
    let email = f.value["email"];
    email = email.toLowerCase();
    let psw = f.value["password"];
    if (email == "" || psw == "") {
      this.showWarn();
    } else {
      let user = new User(email, psw, "", "", "");
      this.userService.Login(user).subscribe(
        (data) => {
          // Check if the login was successful
          this.loggedIn = true;

          // Store login status in localStorage
          localStorage.setItem('isLoggedIn', 'true');

          // Optionally, store user details or tokens
          // localStorage.setItem('user', JSON.stringify(data.user));

          this.router.navigate(['./']);
        },
        (error) => {
          console.log(error);
          this.showError("Incorrect email and/or password.");
        }
      );
    }
  }

  logout() {
    // Clear login status from localStorage
    localStorage.removeItem('isLoggedIn');

    // Optionally, clear other user-related data
    // localStorage.removeItem('user');

    // Reset the loggedIn flag
    this.loggedIn = false;

    // Navigate to the home page or any other appropriate page
    this.router.navigate(['../']);
  }

  ngOnDestroy(): void {
    this.navbarService.display();
  }

  ngOnInit(): void {
    this.navbarService.hide();
  }
}
