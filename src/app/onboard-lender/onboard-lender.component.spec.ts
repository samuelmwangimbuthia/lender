import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardLenderComponent } from './onboard-lender.component';

describe('OnboardLenderComponent', () => {
  let component: OnboardLenderComponent;
  let fixture: ComponentFixture<OnboardLenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardLenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardLenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
