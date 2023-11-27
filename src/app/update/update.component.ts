import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  articles: any[] = [];
  selectedArticle: any = null;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe(
      (data) => {
        this.articles = data;
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }

  deleteArticle(articleId: string): void {
    this.articleService.deleteArticle(articleId).subscribe(
      () => {
        console.log('Article deleted successfully');
        this.loadArticles(); // Refresh the article list after deletion
      },
      (error) => {
        console.error('Error deleting article:', error);
      }
    );
  }

  editArticle(article: any): void {
    this.selectedArticle = { ...article }; // Clone the article to avoid modifying the original in the list
  }

  updateArticle(): void {
    if (this.selectedArticle) {
      const articleId = this.selectedArticle._id; // Replace with your actual article ID property
      const updatedData = {
        Title: this.selectedArticle.Title,
        Description: this.selectedArticle.Description,
        image : this.selectedArticle.image,
        // Add more properties as needed
      };

      this.articleService.updateArticle(articleId, updatedData).subscribe(
        () => {
          console.log('Article updated successfully');
          this.loadArticles(); // Refresh the article list after update
          this.selectedArticle = null; // Clear the selected article
        },
        (error) => {
          console.error('Error updating article:', error);
        }
      );
    }
  }

  cancelUpdate(): void {
    this.selectedArticle = null; // Clear the selected article
  }
}
