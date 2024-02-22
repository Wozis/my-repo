import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdsComponent } from './ads.component';


describe('Test checkStatusFav()', () => {
  let component: AdsComponent;
  let fixture: ComponentFixture<AdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});