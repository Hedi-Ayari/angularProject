import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  apiUrl = "http://localhost:4000/route";

  constructor(public httpClient: HttpClient) { }

  public Login(user: User): Observable<any> {
    //console.log(user);
    return this.httpClient.post<User>(this.apiUrl + '/login', user, {withCredentials: true});
  }

  public register(user: User): Observable<User>{
    //console.log(user);
    return this.httpClient.post<User>(this.apiUrl + "/register", user, {withCredentials: true});
  }

  public getUser(): Observable<User>{
    return this.httpClient.get<User>(this.apiUrl + "/user", {withCredentials: true});
  }

  public logout(): Observable<any>{
    return this.httpClient.post<User>(this.apiUrl + "/logout", {} ,{withCredentials: true});
  }
}
