import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogContactEditorComponent } from './dialog-contact-editor.component';


describe('DialogComponent', () => {
  let component: DialogContactEditorComponent;
  let fixture: ComponentFixture<DialogContactEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogContactEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogContactEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
