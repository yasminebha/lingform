import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[draggable]',
})
export class DraggableDirective {
  isDragging: boolean = false;

  /**
   *
   */
  constructor(private element: ElementRef) {}

  posX!: number;
  poxY!: number;

  @HostListener('drag')
  onDrag($event: any) {
    console.log('===ON_DRAG===', $event);
    console.log(this.element);
    this.isDragging = true;

    // // @ts-ignore
    // this.element.style.transform =
    //   'translate3d(' + e.x + 'px, ' + e.y + 'px, 0)';
  }

  @HostListener('dragstart')
  onDragStart(e: any) {
    console.log('===ON_DRAG_START===', e);
  }

  @HostListener('dragend')
  onDragLeave(e: any) {
    console.log('====ON_DRAG_LEAVE====', e);
    this.isDragging = false;
  }
}
