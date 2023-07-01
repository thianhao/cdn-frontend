import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit, OnDestroy {
  public addUserForm!: FormGroup;
  public label = 'Create User'
  public title = 'Add New Freelancer Details';
  public skillsets! : string[];
  public hobby! : string[];

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData
  ) {
    if(data.action == 'Update') {
      this.label = 'Update User';
      this.title = `Update details for ${this.data.user.username}`;
      this.skillsets = data.user.skillsets;
      this.hobby = data.user.hobby;
    }
  }

  ngOnInit(): void {
    const user = this.data.user;
    this.addUserForm = this.formBuilder.group({
      username: [user.username, [Validators.required, Validators.minLength(5)]],
      email: [user.email, [Validators.required, Validators.email]],
      phone: [user.phone, [Validators.required]],
      skillsets: [user.skillsets, [Validators.required]],
      hobby: [user.hobby, [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.data.user.username = this.addUserForm.value.username as string;
    this.data.user.email = this.addUserForm.value.email as string;
    this.data.user.phone = this.addUserForm.value.phone as string;
    this.dialogRef.close(this.data);
    // this.data.skillsets = this.addUserForm.value.skillsets as string;
    // this.data.hobby = this.addUserForm.value.hobby as string;
  }

  public Cancel(): void {
    this.data.action = 'Cancel';
    this.dialogRef.close();
  }
}

export interface UserDialogData {
  user: User;
  action: string;
}