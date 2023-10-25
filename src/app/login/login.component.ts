import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private loginService: LoginService, private router: Router){}

  onSubmit(form: NgForm) {
    this.loginService.login(this.user).subscribe( response => {
      const acessToken = response.access;
      const refreshToken = response.refresh;

      localStorage.setItem('acessToken', acessToken);
      localStorage.setItem('refreshToken', acessToken);

      this.router.navigate(['']); 
    })
  }
}
