import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TaskSecondary } from './task-secondary';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskSecondaryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getChilds(id: number): Observable<TaskSecondary[]> {
    return this.httpClient
      .get<TaskSecondary[]>(environment.BE_url + '/childs/' + id)
      .pipe(catchError(this.errorHandler));
  }

  create(task: any): Observable<TaskSecondary> {
    console.log("aici");
    return this.httpClient
      .post<TaskSecondary>(
        environment.BE_url + '/api/SecondaryTask/',
        JSON.stringify(task),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<TaskSecondary> {
    return this.httpClient
      .get<TaskSecondary>(environment.BE_url + '/api/SecondaryTask/' + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: number, taskSecondary: TaskSecondary): Observable<TaskSecondary> {
    return this.httpClient
      .put<TaskSecondary>(
        environment.BE_url + '/api/SecondaryTask/' + id,
        JSON.stringify(taskSecondary),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete<TaskSecondary>(
        environment.BE_url + '/api/SecondaryTask/' + id,
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
