import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementButtonsComponent } from './management-buttons.component';

describe('ManagementButtonsComponent', () => {
  let component: ManagementButtonsComponent;
  let fixture: ComponentFixture<ManagementButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagementButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagementButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
