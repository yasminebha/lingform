import { addBlock } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { Form } from '@/shared/models/form.model';
import { FormService } from '@/shared/services/form.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'lg-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css'],
})
export class BuilderComponent implements OnInit {
  constructor(

  ) {}

  async ngOnInit(): Promise<void> {}

}
