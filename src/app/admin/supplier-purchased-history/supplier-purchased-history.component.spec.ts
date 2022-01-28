import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPurchasedHistoryComponent } from './supplier-purchased-history.component';

describe('SupplierPurchasedHistoryComponent', () => {
  let component: SupplierPurchasedHistoryComponent;
  let fixture: ComponentFixture<SupplierPurchasedHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierPurchasedHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPurchasedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
