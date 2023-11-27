// add.component.ts
import { Component } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  // Properties for the article fields
  articleTitle: string;
  articleDescription: string;
  articlePicture: File;

  // Inject the ArticleService
  constructor(private articleService: ArticleService,private messageService: MessageService,private router: Router) {}
  showError(msg: string) {
    this.messageService.add({ key: 'msg', severity: 'error', summary: 'Error', detail: msg });
  }
  showWarn() {
    this.messageService.add({ key: 'msg', severity: 'warn', summary: 'Warning', detail: 'You have to fill the form first' });
  }


  // Method to handle form submission
  
  submitArticle() {
    const articleData = {
      Title: this.articleTitle,
      Description: this.articleDescription,
      image : this.articlePicture,
    };

    // Call the service method to create a new article
    this.articleService.createArticle(articleData).subscribe(
      (response) => {
        console.log('Article created successfully:', response);
        this.router.navigate(['./']);

   },
      (error) => {
        console.error('Error creating article:', error);
      //alert(error)   
      this.showError("check the inputs.");

   }
    );
  }

 
}
