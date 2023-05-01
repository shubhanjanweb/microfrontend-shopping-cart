import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MsgStatus } from '../../user.module';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  msgType: MsgStatus;
  message: string;

  constructor(private fb: FormBuilder, private userSrvc: UserService, private router: Router) {
    this.signUpForm = fb.group({
      emailId: ['', [Validators.maxLength(25)]],
      fullName: ['', [Validators.required, Validators.maxLength(40)]],
      mobileNumber: ['', [Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(15)]],
      photoUrl: ['', [Validators.required, Validators.maxLength(50)]],
      userName: ['', [Validators.required, Validators.maxLength(15)]]
    });
    this.msgType = MsgStatus.NONE;
    this.message = '';
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.userSrvc.registerUser(this.signUpForm.value).subscribe(res => {
        if (res.status) {
          this.msgType = MsgStatus.SUCCESS;
          this.router.navigateByUrl('../signin');
        }
        else {
          this.msgType = MsgStatus.ERROR;
        }
        this.message = res.message;
      });
    }
  }

}
