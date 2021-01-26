import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetPickerComponent } from './budget-picker.component';

describe('BudgetPickerComponent', () => {
  let component: BudgetPickerComponent;
  let fixture: ComponentFixture<BudgetPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
