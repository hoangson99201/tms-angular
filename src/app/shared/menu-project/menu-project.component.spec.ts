import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProjectComponent } from './menu-project.component';

describe('MenuProjectComponent', () => {
  let component: MenuProjectComponent;
  let fixture: ComponentFixture<MenuProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
