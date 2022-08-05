import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogConfirmationComponent } from '../../components/dialog-confirmation/dialog-confirmation.component';
import UserPaginationInterface from '../../interfaces/user-pagination.interface';
import UserInterface from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'contact-list-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  users: UserInterface[] = [];
  pagesQuantity = 0;
  totalItems = 0;
  ngOnInit(): void {
    this.userService.getAll(8).subscribe((res: UserPaginationInterface) => {
      const { users, pagesQuantity, totalItems } = res;
      this.users = users;
      this.pagesQuantity = pagesQuantity;
      this.totalItems = totalItems;
    });
  }
  changeIndex(pageEvent: PageEvent) {
    this.userService
      .getAll(8, pageEvent.pageIndex + 1)
      .subscribe((res: UserPaginationInterface) => {
        const { users, pagesQuantity, totalItems } = res;
        this.users = users;
        this.pagesQuantity = pagesQuantity;
        this.totalItems = totalItems;
      });
  }
  goToUser(userId: number) {
    this.router.navigate([`user/${userId}`]);
  }
  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe((res) => {
      console.log(res);
      this._snackBar.open('Usuário excluído com sucesso.', 'Ok');
      this.ngOnInit();
    });
  }
  openDeleteDialog(userInformations: {
    id: number;
    name: string;
    surname: string;
  }) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '16rem',
      height: '184px',
      data: {
        message: `Deseja realmente excluir o usuário ${userInformations.name} ${userInformations.surname}?`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.response) {
        this.deleteUser(userInformations.id);
      }
    });
  }
}
