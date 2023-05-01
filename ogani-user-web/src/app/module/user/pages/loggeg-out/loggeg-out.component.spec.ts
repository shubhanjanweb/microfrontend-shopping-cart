import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggegOutComponent } from './loggeg-out.component';

describe('LoggegOutComponent', () => {
  let component: LoggegOutComponent;
  let fixture: ComponentFixture<LoggegOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggegOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggegOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
