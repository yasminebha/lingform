import { AppState } from '@/app/store/reducers';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lg-form-list-item',
  templateUrl: './form-list-item.component.html',
  styleUrls: ['./form-list-item.component.css']
})
export class FormListItemComponent implements OnInit {

  constructor( private store: Store<AppState>,
    private router: Router) { }
    @Input()
    formTitle:string='Untitled Form'
    @Input()
    formID:string=''
    @Input()
    createdAt:string='mon 12 2023'
    showMenu: boolean = false;
  ngOnInit(): void {
  }
  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  openInNewTab(): void {
    // Logic to open the form in a new tab
  }

  deleteForm(): void {
    // Logic to delete the form
  }
  displayForm(formid:string){
    this.router.navigate(['builder',formid]).then(()=>{
      window.location.reload();

    })

  }
}
