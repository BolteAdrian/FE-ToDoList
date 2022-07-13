import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task } from './task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.httpClient
      .get<Task[]>(environment.BE_url + '/api/PrincipalTask/')
      .pipe(catchError(this.errorHandler));
  }

  create(task: any): Observable<Task> {
    return this.httpClient
      .post<Task>(
        environment.BE_url + '/api/PrincipalTask/',
        JSON.stringify(task),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<Task> {
    return this.httpClient
      .get<Task>(environment.BE_url + '/api/PrincipalTask/' + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, task: Task): Observable<Task> {
    return this.httpClient
      .put<Task>(
        environment.BE_url + '/api/PrincipalTask/' + id,
        JSON.stringify(task),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete<Task>(
        environment.BE_url + '/api/PrincipalTask/' + id,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
