import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';
import ContactInputInterface from '../interfaces/contact-input.interface';
import ContactInterface from '../interfaces/contact.interface';
import MessageInterface from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private url = 'http://localhost:3333/api/v1/contact';
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  registerContact(
    contact: ContactInputInterface
  ): Observable<ContactInterface> {
    return this.http.post<ContactInterface>(this.url, contact).pipe(
      catchError((error) => {
        this.showError(error.error.msg);
        return throwError(() => error);
      })
    );
  }

  getContact(contactId: number): Observable<ContactInterface> {
    return this.http.get<ContactInterface>(`${this.url}/${contactId}`).pipe(
      catchError((error) => {
        this.showError(error.error.msg);
        return throwError(() => error);
      })
    );
  }

  deleteContact(contactId: number): Observable<MessageInterface> {
    return this.http.delete<MessageInterface>(`${this.url}/${contactId}`).pipe(
      catchError((error) => {
        this.showError(error.error.msg);
        return throwError(() => error);
      })
    );
  }

  updateContact(
    contactId: number,
    contact: { identifier: string; isWhatsapp: boolean }
  ): Observable<MessageInterface> {
    return this.http
      .put<MessageInterface>(this.url, {
        id: contactId,
        ...contact,
      })
      .pipe(
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
