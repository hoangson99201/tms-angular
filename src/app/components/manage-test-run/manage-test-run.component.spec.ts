import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTestRunComponent } from './manage-test-run.component';

describe('ManageTestRunComponent', () => {
  let component: ManageTestRunComponent;
  let fixture: ComponentFixture<ManageTestRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTestRunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTestRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
