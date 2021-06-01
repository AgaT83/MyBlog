import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url: string = 'http://localhost:3000/posts';

  private sortCondition = '_sort=id&_order=desc';

  constructor(private httpClient: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.url + '?' + this.sortCondition).pipe(catchError(this.handleError));
  }

  getPostsByCriteria(criteria: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.url  + '?' + criteria + '&' +  this.sortCondition).pipe(catchError(this.handleError));
  } 

  getPost(id: number): Observable<Post> {
    return this.httpClient.get<Post>(this.url + '/' + id).pipe(catchError(this.handleError));
  }

  updatePost(id: number, post: Post): Observable<Post>{
    return this.httpClient.patch<Post>(this.url + '/' + id, post).pipe(catchError(this.handleError));
  }

  deletePost(id: number): Observable<Post> {
    return this.httpClient.delete<Post>(this.url + '/' + id).pipe(catchError(this.handleError));
  }

  addPost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.url, post).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never>{
    return throwError('Something went wrong, please try again later!');
  }

}
