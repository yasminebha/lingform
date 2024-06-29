import { Directive, ElementRef, HostListener, Renderer2, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[draggable]',
})
export class DraggableDirective {
  private startX!: number;
  private startY!: number;
  private initialX!: number;
  private initialY!: number;

  @Output() dragStart = new EventEmitter<void>();
  @Output() dragEnd = new EventEmitter<{ deltaX: number, deltaY: number }>();

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.element.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.element.nativeElement, 'cursor', 'move');
    this.element.nativeElement.draggable = true;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    this.dragStart.emit();
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
    this.startX = event.clientX;
    this.startY = event.clientY;
    const rect = this.element.nativeElement.getBoundingClientRect();
    this.initialX = rect.left;
    this.initialY = rect.top;
    this.renderer.setStyle(this.element.nativeElement, 'opacity', '0.5');
  }

  @HostListener('drag', ['$event'])
  onDrag(event: DragEvent) {
    if (event.clientX === 0 && event.clientY === 0) {
      return;
    }
    const deltaX = event.clientX - this.startX;
    const deltaY = event.clientY - this.startY;
    this.renderer.setStyle(this.element.nativeElement, 'transform', `translate(${deltaX}px, ${deltaY}px)`);
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent) {
    const deltaX = event.clientX - this.startX;
    const deltaY = event.clientY - this.startY;
    this.dragEnd.emit({ deltaX, deltaY });
    this.renderer.setStyle(this.element.nativeElement, 'transform', 'none');
    this.renderer.setStyle(this.element.nativeElement, 'left', `${this.initialX + deltaX}px`);
    this.renderer.setStyle(this.element.nativeElement, 'top', `${this.initialY + deltaY}px`);
    this.renderer.setStyle(this.element.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.element.nativeElement, 'opacity', '1');
  }
}
