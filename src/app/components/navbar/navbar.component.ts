import { AppState } from '@/app/store/reducers';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}
  formid: string | null = '';
  username: string = 'sd';

  ngOnInit() {
    if (this.route) this.formid = this.route.snapshot.paramMap.get('id');
    //  this.store.select((state)=>state.user).subscribe((user)=>{
    //    this.username = user.username

    // })
    // console.log("ddddddddddddd"+this.username);
    
  }
}
