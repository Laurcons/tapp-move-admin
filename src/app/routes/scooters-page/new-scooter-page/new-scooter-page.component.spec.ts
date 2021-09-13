import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScooterPageComponent } from './new-scooter-page.component';

describe('NewScooterPageComponent', () => {
  let component: NewScooterPageComponent;
  let fixture: ComponentFixture<NewScooterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewScooterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewScooterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
