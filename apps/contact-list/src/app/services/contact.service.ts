import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ContactInputInterface from '../interfaces/contact-input.interface';
import ContactInterface from '../interfaces/contact.interface';


@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private url = 'http://localhost:3333/api/v1/contact';
  constructor(private http: HttpClient) {}

  registerContact(contact: ContactInputInterface):Observable<ContactInterface> {
    return this.http.post<ContactInterface>(this.url, contact);
  }

  getContact(contactId: number):Observable<ContactInterface> {
    return this.http.get<ContactInterface>(`${this.url}/${contactId}`);
  }

  deleteContact(contactId: number) {
    return this.http.delete<ContactInterface>(`${this.url}/${contactId}`);
  }

  updateContact(contactId: number, contact:{identifier: string, isWhatsapp: boolean}) {
    return this.http.put<ContactInterface>(this.url, {
      id: contactId,
      ...contact
    });
  }
}
