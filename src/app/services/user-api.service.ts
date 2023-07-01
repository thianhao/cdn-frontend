import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/users";


@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private unsubscribe = new Subject<void>();
  private baseUrl = environment.backendApiUrl + '/user';
  private userSubject = new BehaviorSubject<User[]>([
    {
      id: -1,
      username: '',
      email: '',
      phone: '',
      skillsets: [],
      hobby: []
    }
  ]);
  public User$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  public UpdateUser(user: User[]): void {
    this.userSubject.next(user);
  }

  public GetAllUser(): Observable<User[]> {
    return this.http.get(this.baseUrl) as Observable<User[]>;
  }

  public GetAllUserById(id: number): Observable<User[]> {
    return this.http.get(this.baseUrl + '/' + id) as Observable<User[]>;
  }

  public AddUser(user: User): Observable<unknown> {
    return this.http.post(this.baseUrl, user);
  }

  public UpdateUserDetails(user: User): Observable<unknown> {
    const id = user.id;
    return this.http.patch(this.baseUrl + '/' + id, user);
  }

  public DeleteUser(id: string): Observable<unknown> {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  public Dispose(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}