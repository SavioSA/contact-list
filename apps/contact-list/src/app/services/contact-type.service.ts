import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import ContactTypeInterface from '../interfaces/contact-type.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactTypeService {
  private url = 'http://localhost:3333/api/v1/contact-type';
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar) { }

  getAll(offset = 0, page = 0): Observable<ContactTypeInterface[]> {
    return this.http.get<ContactTypeInterface[]>(
      `${this.url}?offset=${offset}&page=${page}`
    ).pipe(catchError(error => {
      this.showError();
      return throwError(()=> error);
    }))
  }
  showError() {
    this._snackBar.open("Houve um erro com a sua solicitação.")
  }
}
