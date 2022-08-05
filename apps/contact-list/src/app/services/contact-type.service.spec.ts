import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactTypeService } from './contact-type.service';

describe('ContactTypeService', () => {
  let service: ContactTypeService;
  let controller: HttpTestingController;

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
    service = TestBed.inject(ContactTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return contact types', () => {
    service.getAll().subscribe((res) => {
      expect(res).toEqual([
        {
          id: 1,
          type: 'phone',
        },
      ]);
    });
  });

  it('should return error to get contact types', () => {
    service.getAll().subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });

    const req = controller.expectOne(
      'http://localhost:3333/api/v1/contact-type?offset=0&page=0'
    );
    req.flush('error', { status: 500, statusText: 'Broken Service' });
  });
});
