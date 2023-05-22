import { addBlock, updateBuilder } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { Form } from '@/shared/models/form.model';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { FormService } from '@/shared/services/form.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css', '../builder.component.css'],
})
export class ViewComponent implements OnInit {
  mode: 'live' | 'edit' = 'live';

  private form?: Form;

  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private store: Store<AppState>
  ) {}

  async ngOnInit(): Promise<void> {}

  onSubmit(f: NgForm) {
    console.log(f.value);
  }
  async test() {
    // if (this.formId !== null) {
    // }
  }
}
