import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGlobleComponent } from './page-globle.component';

describe('PageGlobleComponent', () => {
  let component: PageGlobleComponent;
  let fixture: ComponentFixture<PageGlobleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGlobleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGlobleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
