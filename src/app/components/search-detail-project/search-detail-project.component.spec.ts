import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDetailProjectComponent } from './search-detail-project.component';

describe('SearchDetailProjectComponent', () => {
  let component: SearchDetailProjectComponent;
  let fixture: ComponentFixture<SearchDetailProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDetailProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDetailProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
