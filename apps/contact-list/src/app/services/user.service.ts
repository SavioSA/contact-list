import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import MessageInterface from '../interfaces/message.interface';
import UserPaginationInterface from '../interfaces/user-pagination.interface';
import UserInterface from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:3333/api/v1/user';
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  getAll(offset = 0, page = 0): Observable<UserPaginationInterface> {
    return this.http
      .get<UserPaginationInterface>(`${this.url}?offset=${offset}&page=${page}`)
      .pipe(
        catchError((error) => {
          this.showError(error.error.msg);
          return throwError(() => error);
        })
      );
  }

  registerUser(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(this.url, user).pipe(
      catchError((error) => {
        this.showError(error.error.msg);
        return throwError(() => error);
      })
    );
  }

  getUser(userId: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.url}/${userId}`).pipe(
      catchError((error) => {
        this.showError(error.error.msg);
        return throwError(() => error);
      })
    );
  }

  editUser(user: UserInterface): Observable<MessageInterface> {
    return this.http.put<MessageInterface>(this.url, user).pipe(
      catchError((error) => {
        this.showError(error.error.msg);
        return throwError(() => error);
      })
    );
  }
  deleteUser(userId: number): Observable<MessageInterface> {
    return this.http.delete<MessageInterface>(`${this.url}/${userId}`).pipe(
      catchError((error) => {
        console.log(error);

        this.showError(error.error.msg);
        return throwError(() => error);
      })
    );
  }
  showError(msg: string) {
    this._snackBar.open(msg, 'OK');
  }
}
