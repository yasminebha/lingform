import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponentsComponent } from './input-components.component';

describe('InputComponentsComponent', () => {
  let component: InputComponentsComponent;
  let fixture: ComponentFixture<InputComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
