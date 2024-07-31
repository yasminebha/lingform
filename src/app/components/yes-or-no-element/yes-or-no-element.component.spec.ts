import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesOrNoElementComponent } from './yes-or-no-element.component';

describe('YesOrNoElementComponent', () => {
  let component: YesOrNoElementComponent;
  let fixture: ComponentFixture<YesOrNoElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YesOrNoElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YesOrNoElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
