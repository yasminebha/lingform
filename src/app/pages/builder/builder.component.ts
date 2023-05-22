import { addBlock } from '@/app/store/actions/builder.actions';
import { AppState } from '@/app/store/reducers';
import { Form } from '@/shared/models/form.model';
import { FormService } from '@/shared/services/form.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lg-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css'],
})
export class BuilderComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private formService: FormService,
    private store: Store<AppState>
  ) {}

  async ngOnInit(): Promise<void> {}

  onSubmit(f: NgForm) {
    console.log(f.value); // { first: '', last: '' }
  }
}
