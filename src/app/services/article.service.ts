// article.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:4000/route'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  // Create a new article
  createArticle(articleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/route`, articleData);
  }

  // Get all articles
  getArticles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/articles`);
  }

  getArticleById(articleId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/articles/${articleId}`);
  }

  updateArticle(articleId: string, articleData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/articles/${articleId}`, articleData);
  }

  deleteArticle(articleId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/articles/${articleId}`);
  }
}
