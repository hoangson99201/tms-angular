import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCloseDialogComponent } from './confirm-close-dialog.component';

describe('ConfirmCloseDialogComponent', () => {
  let component: ConfirmCloseDialogComponent;
  let fixture: ComponentFixture<ConfirmCloseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCloseDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCloseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
