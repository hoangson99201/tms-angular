import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTestCaseComponent } from './manage-test-case.component';

describe('ManageTestCaseComponent', () => {
  let component: ManageTestCaseComponent;
  let fixture: ComponentFixture<ManageTestCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTestCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTestCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
