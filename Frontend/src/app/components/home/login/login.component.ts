import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLoginDetails: UserLoginDetails;
  public errorMessage: string;
  public showAlert: boolean;
  
  constructor(private usersService: UsersService, private router: Router) { 
    this.errorMessage = "";
    this.showAlert = false;
    this.userLoginDetails = new UserLoginDetails();
  }

  ngOnInit(): void {
  }

  public login(): void {
    let observable = this.usersService.login(this.userLoginDetails);

    observable.subscribe(successfulLoginServerResponse => {
      
      sessionStorage.setItem("token", successfulLoginServerResponse.token);
      sessionStorage.setItem("userType", successfulLoginServerResponse.userType);
      sessionStorage.setItem("userName", successfulLoginServerResponse.userName );
      this.usersService.loggedInUser = successfulLoginServerResponse;

      if(successfulLoginServerResponse.userType == "CUSTOMER") {
        this.router.navigate(["/home/shop"]);
      }

      if(successfulLoginServerResponse.userType == "ADMIN") {
        this.router.navigate(["/admin"]);
      }

    }, serverErrorResponse => {
      this.errorMessage = serverErrorResponse.error.error;
      this.showAlert = true;
      console.error(serverErrorResponse);
    });
  }

}
