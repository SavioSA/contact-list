import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import MessageInterface from '../interfaces/message.interface';
import UserPaginationInterface from '../interfaces/user-pagination.interface';
import UserInterface from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:3333/api/v1/user';
  constructor(private http: HttpClient) {}

  getAll(offset = 0, page = 0): Observable<UserPaginationInterface> {
    return this.http.get<UserPaginationInterface>(
      `${this.url}?offset=${offset}&page=${page}`
    );
  }

  registerUser(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(this.url, user);
  }

  getUser(userId: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.url}/${userId}`);
  }

  editUser(user: UserInterface): Observable<MessageInterface> {
    return this.http.put<MessageInterface>(this.url, user);
  }
  deleteUser(userId: number): Observable<MessageInterface> {
    return this.http.delete<MessageInterface>(`${this.url}/${userId}`);
  }
}
