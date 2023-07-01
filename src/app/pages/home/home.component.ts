import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/users';
import { UserApiService } from 'src/app/services/user-api.service';

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
}
