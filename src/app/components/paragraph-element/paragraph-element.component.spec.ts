import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphElementComponent } from './paragraph-element.component';

describe('ParagraphElementComponent', () => {
  let component: ParagraphElementComponent;
  let fixture: ComponentFixture<ParagraphElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParagraphElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParagraphElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
