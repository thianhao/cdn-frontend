import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/users';
import { UserApiService } from 'src/app/services/user-api.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private userList!: User[];
  private unsubscribe = new Subject<void>();

  public get UserList(): User[] {
    return this.userList;
  }

  constructor(
    private userApiService: UserApiService,
    private dialog: MatDialog
  ) {
   
   }

  ngOnInit(): void {
    this.GetUserList();
    
    this.userApiService.User$.pipe(takeUntil(this.unsubscribe)).subscribe(u => {
      this.userList = u;
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public GetUserList(): void {
    this.userApiService.GetAllUser().pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (u) => {
        this.userApiService.UpdateUser(u);
      }
    });
  }

  public OpenDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: {
      id: -1,
      username: '',
      email: '',
      phone: '',
      skillsets: [],
      hobby: []
      }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      console.log(`Dialog result: ${data}`);
    });
  }
}
