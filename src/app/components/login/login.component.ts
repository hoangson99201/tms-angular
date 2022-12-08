import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  user: User = {};

  submit() {
    this.authService.login(this.user).subscribe({
      next: (res) => {
        console.log(res);
        let payload: { "sub": number, "email": string, "iat": number, "exp": number } = JSON.parse(Buffer.from(res.split('.')[1], 'base64').toString('binary'));
        const d = new Date(payload.exp * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = "token=" + res + ";" + expires + ";path=/tms";
        this.authService.load().subscribe(user => {
          AuthService.activeUser = user;
        });
        this.router.navigateByUrl('/');
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Login failed', 'Error');
      },
    });
  }


}
