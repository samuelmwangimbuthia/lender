import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartLendingComponent } from './start-lending.component';

describe('StartLendingComponent', () => {
  let component: StartLendingComponent;
  let fixture: ComponentFixture<StartLendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartLendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartLendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
