import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagestatiqueComponent } from './pagestatique.component';

describe('PagestatiqueComponent', () => {
  let component: PagestatiqueComponent;
  let fixture: ComponentFixture<PagestatiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagestatiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagestatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
