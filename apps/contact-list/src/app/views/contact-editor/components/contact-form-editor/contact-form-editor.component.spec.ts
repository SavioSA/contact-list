import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactTypeService } from 'apps/contact-list/src/app/services/contact-type.service';
import { ContactService } from 'apps/contact-list/src/app/services/contact.service';
import { UserService } from 'apps/contact-list/src/app/services/user.service';
import { of } from 'rxjs';
import { ContactFormEditorComponent } from './contact-form-editor.component';

describe('ContactFormEditorComponent', () => {
  let component: ContactFormEditorComponent;
  let fixture: ComponentFixture<ContactFormEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactFormEditorComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: jest.fn(),
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
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
          provide: UserService,
          useValue: {
            getAll: () => {
              return {
                subscribe: jest.fn,
              };
            },
            getUser: () => {
              return {
                subscribe: jest.fn,
              };
            },
            editUser: () => {
              return {
                subscribe: jest.fn,
              };
            },
            registerUser: () => {
              return {
                subscribe: jest.fn,
              };
            },
          },
        },
        {
          provide: ContactService,
          useValue: {
            updateContact: () => {
              return {
                subscribe: jest.fn,
              };
            },
            getContact: () => {
              return {
                subscribe: jest.fn,
              };
            },
            deleteContact: () => {
              return {
                subscribe: jest.fn,
              };
            },
            registerContact: () => {
              return {
                subscribe: jest.fn,
              };
            },
          },
        },
        {
          provide: ContactTypeService,
          useValue: {
            getAll: () => {
              return {
                subscribe: jest.fn,
              };
            },
          },
        },
        {
          provide: FormBuilder,
          useValue: {
            group: jest.fn,
          },
        },
        {
          provide: MatSnackBar,
          useValue: {
            open: jest.fn,
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 2,
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormEditorComponent);
    component = fixture.componentInstance;
    const formBuilder: FormBuilder = new FormBuilder();

    component.contactForm = formBuilder.group({
      type: [
        0,
        {
          validators: [Validators.required],
        },
      ],
      phone: [
        '',
        {
          validators: [Validators.minLength(11), Validators.maxLength(11)],
        },
      ],
      email: [
        '',
        {
          validators: [Validators.email],
        },
      ],
      isWhatsapp: [
        false,
        {
          validators: [],
        },
      ],
    });

    component.userForm = formBuilder.group({
      name: [
        'a',
        {
          validators: [Validators.required, Validators.minLength(3)],
        },
      ],
      surname: [
        '',
        {
          validators: [Validators.required, Validators.minLength(3)],
        },
      ],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user', () => {
    const spy = jest.spyOn(component, 'getUser');
    component.ngOnInit();
    expect(spy).toBeCalled();
  });

  it('should redirect to list', () => {
    jest.spyOn(component, 'getUser');
    jest.spyOn(component.userService, 'getUser').mockReturnValue(
      of({
        name: 'teste',
        surname: 'teste',
      })
    );
    const spy = jest.spyOn(component.router, 'navigate');
    component.ngOnInit();
    expect(spy).toBeCalledWith(['/list']);
  });

  it('should update contact', () => {
    const spy = jest.spyOn(component, 'getUser');
    jest.spyOn(component.contactService, 'updateContact').mockReturnValue(
      of({
        msg: 'ok',
      })
    );
    component.updateContact({ validated: true }, component);
    expect(spy).toBeCalled();
  });

  it('should edit contact with phone', () => {
    const spy = jest.spyOn(component, 'openDialog');
    jest.spyOn(component.contactService, 'getContact').mockReturnValue(
      of({
        identifier: '999999999',
        isWhatsapp: true,
        contactType: {
          id: 1,
          type: 'phone',
        },
      })
    );

    component.editContact(1);
    expect(spy).toBeCalled();
  });

  it('should edit contact with email', () => {
    const spy = jest.spyOn(component, 'openDialog');
    jest.spyOn(component.contactService, 'getContact').mockReturnValue(
      of({
        identifier: '999999999',
        isWhatsapp: true,
        contactType: {
          id: 2,
          type: 'phone',
        },
      })
    );

    component.editContact(1);
    expect(spy).toBeCalled();
  });

  it('should create contact', () => {
    const spy = jest.spyOn(component, 'setContacts');
    jest.spyOn(component, 'setContacts').mockReturnValueOnce();
    component.userId = 1;
    fixture.detectChanges();

    component.createContact({ validated: true }, component);
    expect(spy).toBeCalled();
  });

  it('should create contact without send to back end', () => {
    component.userId = undefined;
    const spy = jest.spyOn(component, 'setContactsWithoutSend');
    jest.spyOn(component, 'setContactsWithoutSend').mockReturnValueOnce();
    fixture.detectChanges();

    component.createContact({ validated: true }, component);
    expect(spy).toBeCalled();
  });

  it('should open delete dialog', () => {
    const spy = jest.spyOn(component.dialog, 'open');

    component.openDeleteDialog({ id: 1, identifier: '' });
    expect(spy).toBeCalled();
  });

  it('should add contact', () => {
    const spy = jest.spyOn(component.dialog, 'open');
    component.addContact();
    expect(spy).toBeCalled();
  });

  it('should add get contact types', () => {
    const contactType = [
      {
        id: 1,
        type: '',
      },
    ];
    jest
      .spyOn(component.contactTypeService, 'getAll')
      .mockReturnValue(of(contactType));
    component.getContactTypes();
    expect(component.contactTypes).toEqual(contactType);
  });

  it('should edit user', () => {
    component.userId = 1;
    jest.spyOn(component, 'editUser').mockReturnValue();
    const spy = jest.spyOn(component, 'editUser');
    component.saveUser();
    expect(spy).toBeCalled();
  });

  it('should register user', () => {
    component.userId = undefined;
    jest.spyOn(component, 'registerUser').mockReturnValue();
    const spy = jest.spyOn(component, 'registerUser');
    component.saveUser();
    expect(spy).toBeCalled();
  });

  it('should edit user', () => {
    jest
      .spyOn(component.userService, 'editUser')
      .mockReturnValue(of({ msg: 'ok' }));
    const spy = jest.spyOn(component.userService, 'editUser');
    component.editUser({
      name: '',
      surname: '',
    });
    expect(spy).toBeCalled();
  });

  it('should register user', () => {
    jest.spyOn(component.userService, 'registerUser').mockReturnValue(
      of({
        name: '',
        surname: '',
      })
    );
    const spy = jest.spyOn(component.userService, 'registerUser');
    component.registerUser({
      name: '',
      surname: '',
    });
    expect(spy).toBeCalled();
  });

  it('should delete contact', () => {
    jest.spyOn(component.contactService, 'deleteContact').mockReturnValue(
      of({
        msg: '',
      })
    );
    component.contacts = [
      {
        id: 1,
      },
    ];
    fixture.detectChanges();
    const spy = jest.spyOn(component.contactService, 'deleteContact');
    component.deleteContact({
      id: 1,
      identifier: '',
    });
    expect(spy).toBeCalled();
  });

  it('should delete contact without back end', () => {
    jest.spyOn(component.contactService, 'deleteContact').mockReturnValue(
      of({
        msg: '',
      })
    );
    component.contacts = [
      {
        identifier: '',
      },
    ];
    fixture.detectChanges();
    const spy = jest.spyOn(component.contactService, 'deleteContact');
    component.deleteContact({
      id: undefined,
      identifier: '',
    });
    expect(component.contacts).toEqual([]);
  });

  it('should set contacts without back end (email)', () => {
    component.contactTypes = [
      {
        id: 2,
        type: 'email',
      },
    ];
    component.contactForm.value.email = 'teste@teste.com';
    component.contactForm.value.type = 2;
    component.contactForm.value.isWhatsapp = false;
    fixture.detectChanges();
    component.setContactsWithoutSend();
    expect(component.contacts).toEqual([
      {
        contactTypeName: 'email',
        contactTypeId: 2,
        identifier: 'teste@teste.com',
        isWhatsapp: false,
      },
    ]);
  });

  it('should set contacts without back end (phone)', () => {
    component.contactTypes = [
      {
        id: 1,
        type: 'phone',
      },
    ];
    component.contactForm.value.phone = 'teste@teste.com';
    component.contactForm.value.type = 1;
    component.contactForm.value.isWhatsapp = false;
    fixture.detectChanges();
    component.setContactsWithoutSend();
    expect(component.contacts).toEqual([
      {
        contactTypeName: 'phone',
        contactTypeId: 1,
        identifier: 'teste@teste.com',
        isWhatsapp: false,
      },
    ]);
  });

  it('should set contacts', () => {
    jest.spyOn(component.contactService, 'registerContact').mockReturnValue(
      of({
        identifier: '',
        contactType: {
          type: '',
          id: 1,
        },
        isWhatsapp: false,
      })
    );
    component.setContacts();
    expect(component.contacts).toEqual([
      {
        identifier: '',
        contactType: {
          type: '',
          id: 1,
        },
        isWhatsapp: false,
      },
    ]);
  });

  it('should navigate to list', () => {
    const spy = jest.spyOn(component.router, 'navigate');
    component.goBackToList();
    expect(spy).toBeCalledWith(['/list']);
  });
});
