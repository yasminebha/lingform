import { AppState } from '@/app/store/reducers';
import { FormService } from '@/shared/services/form.service';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store: Store<AppState>, private formService: FormService) { }
  formid: string | null = '';
  username: string = 'sd';
  isSaving = false;

  ngOnInit() {
    if (this.route) this.formid = this.route.snapshot.paramMap.get('id');
    
    this.formService.isSaving$.subscribe((isSaving) => {
      this.isSaving = isSaving;
    });
  
  }
}
