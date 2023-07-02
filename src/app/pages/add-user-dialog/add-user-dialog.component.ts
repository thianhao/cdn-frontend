import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  public addUserForm!: FormGroup;
  public label = 'Create User'
  public title = 'Add New Freelancer Details';
  public skillsets! : string[];
  public hobby! : string[];
  public skillSetsControl!: FormControl<any>;
  public hobbyControl!: FormControl<any>;


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
      phone: [user.phone, [Validators.required, phoneNumberValidator]],
      skillsets: [user.skillsets, [Validators.required]],
      hobby: [user.hobby, [Validators.required]]
    });

    this.skillSetsControl  = this.addUserForm.controls['skillsets'] as FormControl;
    this.hobbyControl  = this.addUserForm.controls['hobby'] as FormControl;

  }

  public UpdateSkillsets(skillsets: string[]): void {
    this.skillsets = skillsets;
    this.addUserForm.get('skillsets')!.setValue(skillsets);
  }

  public UpdateHobby(hobby: string[]): void {
    this.hobby = hobby;
    this.addUserForm.get('hobby')!.setValue(hobby);
  }

  public Confirm(): void {
    this.data.user.username = this.addUserForm.value.username as string;
    this.data.user.email = this.addUserForm.value.email as string;
    this.data.user.phone = this.addUserForm.value.phone as string;
    this.data.user.skillsets = this.addUserForm.value.skillsets;
    this.data.user.hobby = this.addUserForm.value.hobby;
    this.dialogRef.close(this.data);
  }

  public Cancel(): void {
    this.dialogRef.close();
  }
  
}

export interface UserDialogData {
  user: User;
  action: string;
}


export function phoneNumberValidator(control: FormControl) {
  const phoneNumberRegex = /^\+[1-9]{1}[0-9]{3,14}$/; 

  if (control.value && !phoneNumberRegex.test(control.value)) {
    return { invalidPhoneNumber: true };
  }

  return null;
}