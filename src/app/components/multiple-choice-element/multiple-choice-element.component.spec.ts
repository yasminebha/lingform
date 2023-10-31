import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceElementComponent } from './multiple-choice-element.component';

describe('MultipleChoiceElementComponent', () => {
  let component: MultipleChoiceElementComponent;
  let fixture: ComponentFixture<MultipleChoiceElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleChoiceElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleChoiceElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
