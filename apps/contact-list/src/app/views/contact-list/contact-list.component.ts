import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.userService.getAll(8).subscribe((res: UserPaginationInterface) => {
      const { users } = res;
      this.users = users;
    })
  }
}
