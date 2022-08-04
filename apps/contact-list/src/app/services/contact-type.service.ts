import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ContactTypeInterface from '../interfaces/contact-type.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactTypeService {
  private url = 'http://localhost:3333/api/v1/contact-type';
  constructor(private http: HttpClient) {}

  getAll(offset = 0, page = 0): Observable<ContactTypeInterface[]> {
    return this.http.get<ContactTypeInterface[]>(
      `${this.url}?offset=${offset}&page=${page}`
    );
  }
}
