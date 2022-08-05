import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ManagementButtonsComponent } from './management-buttons.component';

describe('ManagementButtonsComponent', () => {
  let component: ManagementButtonsComponent;
  let fixture: ComponentFixture<ManagementButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagementButtonsComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagementButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to new user', () => {
    const spy = jest.spyOn(component.router, 'navigate');
    component.goToNewContact();
    expect(spy).toBeCalledWith(['/user/new']);
  });

  it('should navigate to list', () => {
    const spy = jest.spyOn(component.router, 'navigate');
    component.goToList();
    expect(spy).toBeCalledWith(['/list']);
  });
});
