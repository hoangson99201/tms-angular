import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTestRunDialogComponent } from './select-test-run-dialog.component';

describe('SelectTestRunDialogComponent', () => {
  let component: SelectTestRunDialogComponent;
  let fixture: ComponentFixture<SelectTestRunDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTestRunDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTestRunDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
