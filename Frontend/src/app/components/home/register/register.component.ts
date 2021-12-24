import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/City';
import { UserDetails } from 'src/app/models/UserDetails';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public cities: Array<string>;
  public userDetails: UserDetails;
  public registrationStage: number;

  public registerPartOneForm: FormGroup;
  public id: FormControl;
  public email: FormControl;
  public password: FormControl;
  public confirmPassword: FormControl;

  public alertType: string;
  public alertMessage: string;
  public showAlert: boolean;

  constructor(private usersService: UsersService, private router: Router) { 
    this.cities = Object.values(City);
    this.init();
  }

  ngOnInit(): void {
    // Initializing form controls with validators
    this.id = new FormControl("", [Validators.required, Validators.pattern("^[0-9]{9}$")]);
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.password = new FormControl("", [Validators.required, Validators.pattern("^[0-9a-zA-Z]{8,20}$")]);
    this.confirmPassword = new FormControl("", [Validators.required]);

    // Initializing the from group
    this.registerPartOneForm = new FormGroup({
      id: this.id,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, { validators: this.passwordMatchValidator.bind(this)});
  }

  public passwordMatchValidator(form: FormGroup) {
    const password = form.controls['password'].value;
    const confirmPassword = form.controls['confirmPassword'].value;

    if(!password || !confirmPassword) {
      return null;
    }

    return (password === confirmPassword) ? null : {mismatch: true};
  }

  public next(): void {
    this.userDetails.id = this.id.value;
    this.userDetails.email = this.email.value;
    this.userDetails.password = this.password.value;
    this.registrationStage++;
  }

  public back(): void {
    this.registrationStage--;
  }

  public register(): void {
    this.userDetails.userType = "CUSTOMER";
    let observable = this.usersService.register(this.userDetails);

    observable.subscribe(() => {
      this.init();
      this.showAlert = true;
      
    }, serverErrorResponse => {
      this.handelServerErrors(serverErrorResponse);
      console.error(serverErrorResponse);
    });
  }

  public onCloseAlert(): void {
    this.showAlert = false;
  }

  public handelServerErrors(serverErrorResponse): void {
    this.alertType ="danger";
    this.alertMessage = serverErrorResponse.error.error;

    if (serverErrorResponse.status === 602) {
      this.registrationStage = 1;
      this.id.setValue("");
    }
    else if (serverErrorResponse.status === 601) {
      this.registrationStage = 1;
      this.email.setValue("");
    }

    this.showAlert = true;
  }

  public init(): void {
    this.registerPartOneForm?.reset();
    this.userDetails = new UserDetails();
    this.registrationStage = 1;
    this.showAlert = false;
    this.alertType ="success";
    this.alertMessage = "Account successfully created!";
  }
}
