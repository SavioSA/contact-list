import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import UserPaginationInterface from '../interfaces/user-pagination.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:3333/api/v1/user"
  constructor(private http: HttpClient) { }

  getAll(offset = 0, page= 0): Observable<UserPaginationInterface> {
    return this.http.get<UserPaginationInterface>(`${this.url}?offset=${offset}&page=${page}`);
  }

}
