
import { addBlock } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


@Component({
  selector: 'lg-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.css']
})
export class LeftSideBarComponent implements OnInit {

  constructor(private readonly store:Store<AppState>) { }

  ngOnInit(): void {
  }
  addElementBlock(componentType:string){
    if(componentType === "MultipleChoiceElementComponent"||"OneChoiceComponent"){
      this.store.select('builder').subscribe((builder) => {
        const newBlockId = (Object.keys(builder.blocks).length + 1).toString();

        const newBlock = {
          form_id: '1',
          kind: componentType,
          questLabel: 'what is your name',
          quest_id: newBlockId,
          required: true,
          quest_meta: { options: [] },
        };
        this.store.dispatch(addBlock({
        ...newBlock///ne9sa
          }));
      }
       
      );
  }
}
}
