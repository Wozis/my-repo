import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAdComponent } from './info-ad.component';

describe('InfoAdComponent', () => {
  let component: InfoAdComponent;
  let fixture: ComponentFixture<InfoAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
