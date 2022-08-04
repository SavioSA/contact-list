import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import UserPaginationInterface from "../../interfaces/user-pagination.interface";
import UserInterface from "../../interfaces/user.interface";
import { UserService } from '../../services/user.service';
@Component({
  selector: 'contact-list-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router

  ) { }

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
    this.userService.getAll(8, pageEvent.pageIndex+1).subscribe((res: UserPaginationInterface) => {
      const { users, pagesQuantity, totalItems } = res;
      this.users = users;
      this.pagesQuantity = pagesQuantity;
      this.totalItems = totalItems;
    })
  }
  goToUser(userId: number) {
    this.router.navigate([`user/edit/${userId}`])
  }
  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    })
  }
}
