import { AppState } from '@/app/store/reducers';
import supabase from '@/app/supabase';
import { Form } from '@/shared/models/form.model';
import { FormService } from '@/shared/services/form.service';
import { UserService } from '@/shared/services/user.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userid: string = '';
  forms: any;
  p: number = 1;
  filteredForms: Form[] = [];
  searchTerm: string = '';
  selectAll: boolean = false
  selectedForms: Set<string> = new Set();
  showCheckbox: boolean = false
  constructor(
    private formService: FormService,
    private userService: UserService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.userService.getUser().then((user) => {
      if (user) this.userid = user.id;
    });

    await this.loadForms();

  }
  async loadForms(): Promise<void> {
    this.forms = await this.formService.getFormByUserId(this.userid);
    this.filteredForms = this.forms;

  }
  filterForms(): void {
    if (this.searchTerm.trim() === '') {

      this.filteredForms = this.forms;
    } else {

      this.filteredForms = this.forms.filter((form: { title: string }) =>
        form.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    console.log(searchTerm);

    this.filterForms();
  }

  createForm() {
    this.store
      .select((state) => state.user)
      .subscribe(async (user) => {
        if (user.userId) {
          const formId = await this.formService.newForm(user.userId);
          this.router.navigate(['builder', formId]).then(() => {
            window.location.reload();
          });
        }
      });
  }
  logout() {
    if (this.userid !== null)
      this.userService.logout()
    this.router.navigate(['account/login'])

  }

  onSelectAll(event: Event): void {
    this.showCheckbox = true
    const checkbox = event.target as HTMLInputElement;
    this.selectAll = checkbox.checked;
    this.selectedForms.clear();
    if (this.selectAll) {
      this.filteredForms.forEach((f: Form) => this.selectedForms.add(f.form_id)); // Specify Form type for 'f'
    }
  }

  onFormSelectionChange(event: { formID: string, isChecked: boolean }): void {
    if (event.isChecked) {
      this.selectedForms.add(event.formID);
    } else {
      this.selectedForms.delete(event.formID);
    }
    console.log(this.selectedForms);

  }
  async deleteAll(): Promise<void> {
    const confirmed = window.confirm("Are you sure you want to delete the selected forms?");
    if (confirmed) {
      try {
        const formIdsToDelete = Array.from(this.selectedForms)
        this.formService.deleteMultipleForms(formIdsToDelete)
        this.selectedForms.clear();
        this.selectAll = false;
        this.showCheckbox = false
        await this.loadForms();
      } catch (error) {
        console.error('Error deleting forms:', error);
      }
    }
  }

}
