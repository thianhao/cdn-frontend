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

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
  }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      skillsets: ['', [Validators.required]],
      hobby: ['', [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.data.username = this.addUserForm.value.username as string;
    this.data.email = this.addUserForm.value.email as string;
    this.data.phone = this.addUserForm.value.phone as string;
    this.dialogRef.close(this.data);
    // this.data.skillsets = this.addUserForm.value.skillsets as string;
    // this.data.hobby = this.addUserForm.value.hobby as string;

  }


}
