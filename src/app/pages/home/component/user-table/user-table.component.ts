import { AfterViewChecked, AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UserTableDataSource } from './user-table-datasource';
import { User } from 'src/app/models/users';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AddUserDialogComponent, UserDialogData } from 'src/app/pages/add-user-dialog/add-user-dialog.component';
import { UserApiService } from 'src/app/services/user-api.service';
import { RemoveUserDialogComponent } from 'src/app/pages/remove-user-dialog/remove-user-dialog.component';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements AfterViewChecked, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;

  public dataSource!: UserTableDataSource;
  public displayedColumns = ['id', 'username', 'email', 'phone', 'skillsets', 'hobby', 'action'];
  private userList: User[] = [];
  private unsubscribe = new Subject<void>();


  @Input()
  public set UserData(userData: User[]) {
    this.userList = userData;
    this.dataSource = new UserTableDataSource(this.userList);
  }

  constructor(
    private userApiService: UserApiService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) {
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngAfterViewChecked(): void {
    if(this.userList.some(u => u.id !== -1)) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }
  }

  public OpenDeleteUserDialog(user: User): void {
    const dialogRef = this.dialog.open(RemoveUserDialogComponent, {
      data: user
    });

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      if(data) {
        this.DeleteUser(user.id);
      }
    });
  }

  public DeleteUser(id: number): void {
    this.userApiService.DeleteUser(id).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (n) => this.GetLatestUser(),
      error: (e) => this.dialogService.OpenMessageDialog('HTTP ERROR', e.error.message)
    })
  }

  public OpenUpdateDialog(user: User): void {
    const dialogData: UserDialogData = {
      user: user,
      action: 'Update'
    }
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(data => {
      if(data) {
        this.UpdateUserDetails(data.user);
      }
    });
  }

  public UpdateUserDetails(data: User): void {
    this.userApiService.UpdateUserDetails(data).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (n) => this.GetLatestUser(),
      error: (e) =>  this.dialogService.OpenMessageDialog('HTTP ERROR', e.error.message)
    });
  }

  public GetLatestUser(): void {
    this.userApiService.GetAllUser().pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (u) => {
        this.userApiService.UpdateUser(u);
      },
      error: (e) =>  this.dialogService.OpenMessageDialog('HTTP ERROR', e.error.message)
    });
  }
}
