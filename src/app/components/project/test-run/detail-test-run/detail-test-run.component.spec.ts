import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTestRunComponent } from './detail-test-run.component';

describe('DetailTestRunComponent', () => {
  let component: DetailTestRunComponent;
  let fixture: ComponentFixture<DetailTestRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTestRunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTestRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
