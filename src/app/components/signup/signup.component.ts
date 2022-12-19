import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent {

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  user: User = {
    email: '',
    fullname: '',
    password: ''
  };
  public confirmPassword: string = '';

  submit() {
    this.authService.signup(this.user).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Create account success', 'Success');
        this.router.navigateByUrl('/login');
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Create account failed', 'Error');
      },
    });
  }

  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$";
  regexp = new RegExp(this.emailPattern)
  disable(): boolean {
    return !this.regexp.test(this.user.email!.trim()) || !this.user.email!.trim() || !this.user.fullname!.trim() || !this.user.password!.trim() || (this.user.password != this.confirmPassword);
  }
}
