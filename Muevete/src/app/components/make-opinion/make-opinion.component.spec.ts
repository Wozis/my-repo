import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeOpinionComponent } from './make-opinion.component';

describe('MakeOpinionComponent', () => {
  let component: MakeOpinionComponent;
  let fixture: ComponentFixture<MakeOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeOpinionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
