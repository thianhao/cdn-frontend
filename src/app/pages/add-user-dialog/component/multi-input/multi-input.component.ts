import { Component, Input } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-multi-input',
  templateUrl: './multi-input.component.html',
  styleUrls: ['./multi-input.component.scss']
})
export class MultiInputComponent {
  public formControl = new FormControl(['skillsets']);
  public title = '';
  private items: string[] = [];

  public get Items(): string[] {
    return this.items;
  }

  @Input()
  public set Title(data: string) {
    this.title = data;
  }

  @Input()
  public set Items(data: string[]) {
    this.items = data;
  }

  @Input()
  public set FormControl(data: FormControl) {
    this.formControl = data;
  }

  removeKeyword(item: string) {
    const index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      if(!this.items) {
        this.items = [];
      }
      
      this.items.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

}
