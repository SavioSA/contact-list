import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ContactInterface from '../interfaces/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url = "http://localhost:3333/api/v1/contact"
  constructor(private http: HttpClient) { }

  registerContact(contact: ContactInterface) {
    return this.http.post<ContactInterface>(this.url, contact);
  }

  deleteContact(contactId: number) {
    return this.http.delete<ContactInterface>(`${this.url}/${contactId}`);
  }

}
