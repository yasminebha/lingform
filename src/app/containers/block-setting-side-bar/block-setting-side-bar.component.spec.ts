import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockSettingSideBarComponent } from './block-setting-side-bar.component';

describe('BlockSettingSideBarComponent', () => {
  let component: BlockSettingSideBarComponent;
  let fixture: ComponentFixture<BlockSettingSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockSettingSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockSettingSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
