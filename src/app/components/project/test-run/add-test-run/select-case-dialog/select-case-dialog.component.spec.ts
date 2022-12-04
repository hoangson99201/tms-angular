import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCaseDialogComponent } from './select-case-dialog.component';

describe('SelectCaseDialogComponent', () => {
  let component: SelectCaseDialogComponent;
  let fixture: ComponentFixture<SelectCaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCaseDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
