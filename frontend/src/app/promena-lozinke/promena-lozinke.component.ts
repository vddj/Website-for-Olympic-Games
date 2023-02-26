import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  registerForm: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }

  username: string;
  passwordOld: string;
  passwordNew: string;

  get f() { return this.registerForm.controls; }

  submit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;
    let data = JSON.parse(JSON.stringify(this.registerForm.value, null, 4), (key, value)=>{
      if(key === 'username') this.username = value;
      else if(key === 'firstName') this.passwordOld = value;
      else if(key === 'password') this.passwordNew = value;
    });

    if(this.passwordOld === this.passwordNew) {
      alert('нова лозинка је иста као и стара');
    }
    else if(!this.proveraLozinke(this.passwordNew)){
      //alert('формат лозинке је неисправан');
      return;
    }
    else {
      this.userService.promeniLozinku(this.username, this.passwordOld, this.passwordNew).subscribe(response=>{
        if(response['message']=='user changed') alert('ok');
        else alert("jok");
      });
      this.router.navigate(['login']);
    }
  }

  reset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) return;
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
    }
  }

  proveraLozinke(pass: string) {
    let malo = new RegExp("[a-z]{3,}");
    let veliko = new RegExp("[A-Z]{1,}");
    let cifra = new RegExp("[0-9]{2,}");
    let prvi = new RegExp('^[a-zA-Z]');
    let special = new RegExp("[\\$\\%\\^\\+\\=\\[\\]\\{\\!\\@\\#\\}\\;\\:\\|\\,\\.\\<\\>\\?\\&\\*\\(\\)\\_]{2,}");
    let uzastopni = new RegExp('([a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:\\|,.<>\?])\\1\\1\\1+');

    if (!malo.test(pass)) alert('минималан број малих слова је 3');
    if (!veliko.test(pass)) alert('минималан број великих слова је 1');
    if (!cifra.test(pass)) alert('минималан број нумерика је 2');
    if (!special.test(pass)) alert('минималан број специјалних карактера је 2');
    if (!prvi.test(pass)) alert('почетни карактер мора бити слово мало или велико');
    if (uzastopni.test(pass)) alert('максималан број узастопних карактера је три');
    if (malo.test(pass) && veliko.test(pass) && cifra.test(pass) && special.test(pass) 
      && prvi.test(pass) && !uzastopni.test(pass)) return true;
    else return false;
  }
}
