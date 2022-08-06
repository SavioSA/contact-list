import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import ContactInputInterface from '../interfaces/contact-input.interface';
import ContactInterface from '../interfaces/contact.interface';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;
  let controller: HttpTestingController;
  const url = 'http://localhost:3333/api/v1/contact';
  const contactInput: ContactInputInterface = {
    id: 1,
    identifier: '999999999',
    isWhatsapp: true,
    contactTypeId: 1,
  };
  const contact: ContactInterface = {
    id: 1,
    identifier: '999999999',
    isWhatsapp: true,
    contactType: {
      id: 1,
      type: 'phone',
    },
  };
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
    service = TestBed.inject(ContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get contact', () => {
    service.getContact(1).subscribe((res) => {
      expect(res).toEqual([contact]);
    });
  });

  it('should return error to get contact ', () => {
    service.getContact(1).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
    const req = controller.expectOne(`${url}/1`);
    req.flush('error', { status: 500, statusText: 'Broken Service' });
  });

  it('should register contact', () => {
    service.registerContact(contactInput).subscribe((res) => {
      expect(res).toEqual([]);
    });
  });

  it('should return error to register contact ', () => {
    service.registerContact(contactInput).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
    const req = controller.expectOne(`${url}`);
    req.flush('error', { status: 500, statusText: 'Broken Service' });
  });

  it('should delete contact', () => {
    service.deleteContact(1).subscribe((res) => {
      expect(res).toBeTruthy();
    });
  });

  it('should return error to register contact ', () => {
    service.deleteContact(1).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
    const req = controller.expectOne(`${url}/1`);
    req.flush('error', { status: 500, statusText: 'Broken Service' });
  });

  it('should update contact', () => {
    service.updateContact(1, contact).subscribe((res) => {
      expect(res).toBeTruthy();
    });
  });

  it('should return error to register contact ', () => {
    service.updateContact(1, contact).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });
    const req = controller.expectOne(url);
    req.flush('error', { status: 500, statusText: 'Broken Service' });
  });
});
