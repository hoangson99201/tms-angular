import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMenuProjectComponent } from './new-menu-project.component';

describe('NewMenuProjectComponent', () => {
  let component: NewMenuProjectComponent;
  let fixture: ComponentFixture<NewMenuProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMenuProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMenuProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
