import { Component, Inject } from '@angular/core';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-remove-user-dialog',
  templateUrl: './remove-user-dialog.component.html',
  styleUrls: ['./remove-user-dialog.component.scss']
})
export class RemoveUserDialogComponent {
  public user = '';

  constructor(
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.user = this.data.username;
  }

}
