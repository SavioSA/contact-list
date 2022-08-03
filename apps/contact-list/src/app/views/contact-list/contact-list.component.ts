import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import UserPaginationInterface from "../../interfaces/user-pagination.interface";
import UserInterface from "../../interfaces/user.interface";
import { UserService } from '../../services/user.service';
@Component({
  selector: 'contact-list-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  constructor(private userService: UserService) {}

  users: UserInterface[] = [] ;
  pagesQuantity = 0;
  totalItems = 0;
  ngOnInit(): void {
    this.userService.getAll(8).subscribe((res: UserPaginationInterface) => {
      const { users, pagesQuantity, totalItems } = res;
      this.users = users;
      this.pagesQuantity = pagesQuantity;
      this.totalItems = totalItems;
    })
  }
  changeIndex(pageEvent: PageEvent) {
    console.log(pageEvent.pageSize);

    this.userService.getAll(8, pageEvent.pageIndex+1).subscribe((res: UserPaginationInterface) => {
      const { users, pagesQuantity, totalItems } = res;
      this.users = users;
      this.pagesQuantity = pagesQuantity;
      this.totalItems = totalItems;
    })
  }
}
