import { AfterViewChecked, AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UserTableDataSource } from './user-table-datasource';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements AfterViewChecked {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;

  private userList: User[] = [];
  public dataSource!: UserTableDataSource;
  public displayedColumns = ['id', 'username', 'email', 'phone', 'skillsets', 'hobby', 'action'];

  @Input()
  public set UserData(userData: User[]) {
    this.userList = userData;
    this.dataSource = new UserTableDataSource(this.userList);
  }

  constructor() {
  }

  ngAfterViewChecked(): void {
    if(this.userList.some(u => u.id !== -1)) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }
  }
}
