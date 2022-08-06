import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogConfirmationComponent } from './dialog-confirmation.component';
describe('DialogConfirmationComponent', () => {
  let component: DialogConfirmationComponent;
  let fixture: ComponentFixture<DialogConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConfirmationComponent],
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

    fixture = TestBed.createComponent(DialogConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return postive', () => {
    jest.spyOn(component.dialogRef, 'close');
    component.postiveReturn();
    expect(component.dialogRef.close).toHaveBeenCalled;
  });

  it('should return negative', () => {
    jest.spyOn(component.dialogRef, 'close');
    component.negativeReturn();
    expect(component.dialogRef.close).toHaveBeenCalled;
  });
});
