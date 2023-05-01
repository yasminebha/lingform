import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageloginComponent } from './pagelogin.component';

describe('PageloginComponent', () => {
  let component: PageloginComponent;
  let fixture: ComponentFixture<PageloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
