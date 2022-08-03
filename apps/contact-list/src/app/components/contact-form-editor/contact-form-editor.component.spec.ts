import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormEditorComponent } from './contact-form-editor.component';

describe('ContactFormEditorComponent', () => {
  let component: ContactFormEditorComponent;
  let fixture: ComponentFixture<ContactFormEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactFormEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
