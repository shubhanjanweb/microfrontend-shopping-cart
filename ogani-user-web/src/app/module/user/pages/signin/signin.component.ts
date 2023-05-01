import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/module/user/auth.service';
import { MsgStatus } from '../../user.module';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  msgType: MsgStatus;
  message: string;

  constructor(private fb: FormBuilder, private authSrvc: AuthService, private router: Router) {
    this.signInForm = fb.group({
      userName: ['', [Validators.required, Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.maxLength(15)]]
    });
    this.msgType = MsgStatus.NONE;
    this.message = '';
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.authSrvc.signin(this.signInForm.value).subscribe(res => {
        if (res.status) {
          this.msgType = MsgStatus.SUCCESS;
          this.router.navigateByUrl('/dashboard/home');
        }
        else {
          this.msgType = MsgStatus.ERROR;
        }
        this.message = res.message + ' Redirecting to Dashboad page...';
      });
    }
  }

}
