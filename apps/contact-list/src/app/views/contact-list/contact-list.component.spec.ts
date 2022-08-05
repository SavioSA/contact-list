import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import UserInterface from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { ContactListComponent } from './contact-list.component';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactListComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            open: jest.fn,
          },
        },
        {
          provide: MatDialog,
          useValue: {
            close: jest.fn(),
            open: () => {
              return {
                afterClosed: () => {
                  return {
                    subscribe: () => {
                      return of({ response: true });
                    },
                  };
                },
              };
            },
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            open: jest.fn,
            afterClosed: () => {
              return {
                subscribe: jest.fn,
              };
            },
          },
        },
        {
          provide: MatSnackBar,
          useValue: {
            open: jest.fn,
          },
        },
        {
          provide: UserService,
          useValue: {
            getAll: () => {
              return {
                subscribe: jest.fn,
              };
            },
            deleteUser: () => {
              return {
                subscribe: jest.fn,
              };
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to user details', () => {
    const spy = jest.spyOn(component.router, 'navigate');
    component.goToUser(1);
    expect(spy).toBeCalledWith(['user/1']);
  });

  it('should get users', () => {
    const users: UserInterface[] = [];
    const pagesQuantity = 1;
    const totalItems = 0;
    jest.spyOn(component.userService, 'getAll').mockReturnValue(
      of({
        users,
        pagesQuantity,
        totalItems,
      })
    );
    component.users = users;
    component.pagesQuantity = pagesQuantity;
    component.totalItems = totalItems;
    component.ngOnInit();
    expect(component.users).toEqual(users);
    expect(component.pagesQuantity).toEqual(pagesQuantity);
    expect(component.totalItems).toEqual(totalItems);
  });

  it('should get new index of users', () => {
    const users: UserInterface[] = [];
    const pagesQuantity = 1;
    const totalItems = 0;
    jest.spyOn(component.userService, 'getAll').mockReturnValue(
      of({
        users,
        pagesQuantity,
        totalItems,
      })
    );
    component.users = users;
    component.pagesQuantity = pagesQuantity;
    component.totalItems = totalItems;
    const event: PageEvent = {
      length: 1,
      pageIndex: 1,
      previousPageIndex: 0,
      pageSize: 1,
    };
    component.changeIndex(event);
    expect(component.users).toEqual(users);
    expect(component.pagesQuantity).toEqual(pagesQuantity);
    expect(component.totalItems).toEqual(totalItems);
  });

  it('should delete an user', () => {
    jest.spyOn(component.userService, 'deleteUser').mockReturnValue(
      of({
        msg: 'User deleted successfully.',
      })
    );
    const spy = jest.spyOn(component._snackBar, 'open');
    component.deleteUser(1);
    expect(spy).toBeCalled();
  });

  it('should open dialog delete', () => {
    jest.spyOn(component.userService, 'deleteUser').mockReturnValue(
      of({
        msg: 'User deleted successfully.',
      })
    );
    const spy = jest.spyOn(component.dialog, 'open');
    component.openDeleteDialog({
      id: 1,
      name: 'teste',
      surname: 'teste',
    });
    expect(spy).toBeCalled();
  });
});
