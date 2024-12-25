import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    NgFor,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
})
export class HeroSearchComponent {
  search = input.required<string[]>();
  options = input.required<string[]>();

  setSearch = output<string[]>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  searchCtrl = new FormControl('');

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const options = this.options();
    const option = options.find(o => o.toLowerCase() === value.toLowerCase());

    if(value && option) {
      const search = this.search();

      this.setSearch.emit([...search, option]);
      this.nameInput.nativeElement.value = '';
      this.searchCtrl.setValue(null);
    }
  }

  remove(hero: string): void {
    const search = this.search();
    const index = search.filter(s=> s !== hero);

    this.setSearch.emit(index);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const search = this.search();

    this.setSearch.emit([...search, event.option.viewValue]);
    this.nameInput.nativeElement.value = '';
    this.searchCtrl.setValue(null);
  }

  filteredOptions(v: string): string[] {
    const search = this.search();
    const options = this.options();

    return options
      .filter(option => option.toLowerCase().includes(v))
      .filter(option => !search.length || !search.includes(option));
  }
}
