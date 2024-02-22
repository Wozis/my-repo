import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAdComponent } from './add-new-ad.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Test getButtonStatus()', () => {
  let component: AddNewAdComponent;
  let fixture: ComponentFixture<AddNewAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ AddNewAdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return true if required fields are empty', () => {
    component.titleAd = '';
    component.brandAd = '';
    component.modelAd = '';
    component.priceAd = 0;
    component.yearOfProductionAd = 0;
    component.mileageAd = 0;
    component.consumptionAd = 0;
    component.locationAd = '';
    component.phoneAd = 123;
    component.sellRentAd = '';
    component.descriptionAd = '';
  
    const result = component.getButtonStatus();
  
    expect(result).toBeTrue();
  });

  it('should return false if required fields are filled', () => {
    component.titleAd = 'Title';
    component.brandAd = 'Brand';
    component.modelAd = 'Model';
    component.priceAd = 1;
    component.yearOfProductionAd = 1;
    component.mileageAd = 1;
    component.consumptionAd = 1;
    component.locationAd = 'Location';
    component.phoneAd = 123456789;
    component.sellRentAd = 'Sell';
    component.descriptionAd = 'Description';
  
    const result = component.getButtonStatus();
  
    expect(result).toBeFalse();
  });
});
