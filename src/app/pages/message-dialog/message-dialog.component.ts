import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {
  public message = '';
  public title = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MessageDialogData,
  ) {
    this.message = data.message;
    this.title = data.title;
  }
}

export interface MessageDialogData {
  title: string;
  message: string;
}