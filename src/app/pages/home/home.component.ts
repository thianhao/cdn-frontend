import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { User } from 'src/app/models/users';
import { UserApiService } from 'src/app/services/user-api.service';
import { MatDialog} from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

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
      } as User
    });

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      if(data.action !== 'Cancel') {
        this.AddUser(data);
      }
    });
  }

  public AddUser(data: User): void {
    this.userApiService.AddUser(data).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: () => this.GetUserList(),
      error: (e) => console.log(e)
    });
  }
  
}
