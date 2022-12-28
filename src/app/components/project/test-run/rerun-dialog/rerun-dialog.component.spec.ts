import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RerunDialogComponent } from './rerun-dialog.component';

describe('RerunDialogComponent', () => {
  let component: RerunDialogComponent;
  let fixture: ComponentFixture<RerunDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RerunDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RerunDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
