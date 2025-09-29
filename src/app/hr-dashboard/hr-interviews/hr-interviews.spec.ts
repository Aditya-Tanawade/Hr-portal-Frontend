import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrInterviews } from './hr-interviews';

describe('HrInterviews', () => {
  let component: HrInterviews;
  let fixture: ComponentFixture<HrInterviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrInterviews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrInterviews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
