import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormElementboxComponent } from './form-elementbox.component';

describe('FormElementboxComponent', () => {
  let component: FormElementboxComponent;
  let fixture: ComponentFixture<FormElementboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormElementboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormElementboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
