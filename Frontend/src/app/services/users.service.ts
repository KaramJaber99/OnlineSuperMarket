import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UserDetails } from '../models/UserDetails';
import { UserLoginDetails } from '../models/UserLoginDetails';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public loggedInUser: SuccessfulLoginServerResponse;

  constructor(private http: HttpClient) { 
    this.loggedInUser = new SuccessfulLoginServerResponse();
  }

  public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {
    return this.http.post<SuccessfulLoginServerResponse>
      ("http://localhost:3001/users/login", userLoginDetails);
  }

  public register(userDeatils: UserDetails): Observable<UserDetails> {
    return this.http.post<UserDetails>
      ("http://localhost:3001/users/", userDeatils);
  }

  public getStreet(): Observable<string> {
    return this.http.get<string>("http://localhost:3001/users/street");
  }
  
  public getCity(): Observable<string> {
    return this.http.get<string>("http://localhost:3001/users/city");
  }

  public logout(): Observable<void> {
    return this.http.get<void>("http://localhost:3001/users/logout");
  }
}

