import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMilestoneComponent } from './detail-milestone.component';

describe('DetailMilestoneComponent', () => {
  let component: DetailMilestoneComponent;
  let fixture: ComponentFixture<DetailMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMilestoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
