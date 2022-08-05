import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import UserInterface from '../interfaces/user.interface';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let controller: HttpTestingController;
  const user: UserInterface = {
    name: 'teste',
    surname: 'teste',
    contacts: [
      {
        id: 1,
        identifier: '999999999',
        isWhatsapp: true,
        contactType: {
          id: 1,
          type: 'phone',
        },
      },
    ],
  };
  const url = 'http://localhost:3333/api/v1/user';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: MatSnackBar,
          useValue: {
            open: jest.fn,
          },
        },
      ],
    });
    controller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  it('should get users', () => {
    service.getAll().subscribe((res) => {
      expect(res).toEqual([user]);
    });
  });

  it('should return error to get users ', () => {
    service.getAll().subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
    const req = controller.expectOne(`${url}?offset=0&page=0`);
    req.flush('error', { status: 500, statusText: 'Broken Service' });
  });

  it('should register users', () => {
    service.registerUser(user).subscribe((res) => {
      expect(res).toEqual([user]);
    });
  });

  it('should return error to register users ', () => {
    service.registerUser(user).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
    const req = controller.expectOne(url);
    req.flush('error', { status: 500, statusText: 'Broken Service' });
  });

  it('should get user', () => {
    service.getUser(1).subscribe((res) => {
      expect(res).toEqual(user);
    });
  });

  it('should return error get user ', () => {
    service.getUser(1).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
    const req = controller.expectOne(`${url}/1`);
    req.flush('error', { status: 500, statusText: 'Broken Service' });
  });

  it('should edit user', () => {
    service.editUser(user).subscribe((res) => {
      expect(res).toBeTruthy();
    });
  });

  it('should edit error get user ', () => {
    service.editUser(user).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
    const req = controller.expectOne(url);
    req.flush('error', { status: 500, statusText: 'Broken Service' });
  });

  it('should delete user', () => {
    service.deleteUser(1).subscribe((res) => {
      expect(res).toBeTruthy();
    });
  });

  it('should delete error get user ', () => {
    service.deleteUser(1).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
    const req = controller.expectOne(`${url}/1`);
    req.flush('error', { status: 500, statusText: 'Broken Service' });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
