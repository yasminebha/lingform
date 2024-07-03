
import { QuestionElement } from '@/shared/models/questionElement.model';
import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'lg-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css'],
})
export class BuilderComponent implements OnInit {
  showModal:boolean=false
  selectedBlock: any;
  @Output()isSaving:boolean=false
  
    constructor(private cdr: ChangeDetectorRef
  
    ) {}
    async ngOnInit(): Promise<void> {}

  onBlockSelected(block: any) {
    this.selectedBlock = block;
    console.log(this.selectedBlock);
    this.cdr.detectChanges(); 
    
  }

  closeSettings() {
    this.selectedBlock = null;
  }

}
