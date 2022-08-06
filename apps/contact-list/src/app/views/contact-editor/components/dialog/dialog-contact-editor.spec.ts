import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogContactEditorComponent } from './dialog-contact-editor.component';

describe('DialogComponent', () => {
  let component: DialogContactEditorComponent;
  let fixture: ComponentFixture<DialogContactEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogContactEditorComponent],
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogContactEditorComponent);
    component = fixture.componentInstance;
    component.data = {
      formData: {
        controls: {
          phone: {
            setValue: jest.fn(),
          },
          email: {
            setValue: jest.fn(),
          },
        },
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear form fields', () => {
    const spy = jest.spyOn(
      component.data.formData.controls['phone'],
      'setValue'
    );
    const spy2 = jest.spyOn(
      component.data.formData.controls['email'],
      'setValue'
    );
    component.clearFields();
    expect(spy).toBeCalledWith('');
    expect(spy2).toBeCalledWith('');
  });

  it('should submit', () => {
    jest.spyOn(component.dialogRef, 'close');
    component.submit();
    expect(component.dialogRef.close).toHaveBeenCalled;
  });

  it('should confirm is number', () => {
    const spy = jest.spyOn(component, 'isNumber');
    component.isNumber({ which: 30 });
    expect(spy).toReturnWith(true);
  });

  it('should negate is number', () => {
    const spy = jest.spyOn(component, 'isNumber');
    component.isNumber({ which: 32 });
    expect(spy).toReturnWith(false);
  });
});
