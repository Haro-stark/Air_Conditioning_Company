import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WageHoursPriceComponent } from './wage-hours-price.component';

describe('WageHoursPriceComponent', () => {
  let component: WageHoursPriceComponent;
  let fixture: ComponentFixture<WageHoursPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WageHoursPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WageHoursPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
