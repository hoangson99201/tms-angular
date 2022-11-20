import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestRunComponent } from './add-test-run.component';

describe('AddTestRunComponent', () => {
  let component: AddTestRunComponent;
  let fixture: ComponentFixture<AddTestRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTestRunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTestRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
