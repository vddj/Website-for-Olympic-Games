import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { Zemlja } from '../models/zemlja';
import { UserService } from '../user.service';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  zemlje: Zemlja[] = [];

  constructor(private formBuilder: FormBuilder, private zemljaService: ZemljaService,
    private userService: UserService) { }

  ngOnInit() {
    this.zemljaService.pokupiSveZemlje().subscribe((data: Zemlja[])=>{
      this.zemlje = data;
    })
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      confirmPassword: ['', Validators.required],
      nacional: ['', Validators.required],
      type: ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  submit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    let user = new User;
    let data = JSON.parse(JSON.stringify(this.registerForm.value, null, 4), (key, value)=>{
      if(key === 'username') user.username = value;
      else if(key === 'firstName') user.ime = value;
      else if(key === 'lastName') user.prezime = value;
      else if(key === 'password') user.password = value;
      else if(key === 'email') user.mail = value;
      else if(key === 'nacional') user.nacionalnost = value;
      else if(key === 'type') user.type = value;
    });
    user.odobrenje = 0;
    if(!this.proveraLozinke(user.password)){
      //alert('формат лозинке је неисправан');
      return;
    }
    //alert(JSON.stringify(user));
    this.userService.registrujSe(user).subscribe(response=>{
      if(response['message']=='user added') alert('успешно сте се регистровали, сачекајте одобрење организатора');
      else if(response['message']=='korisnik postoji') alert('корисничко име већ постоји');
      else if(response['message']=='vodja postoji') alert('вођа националне делегације за ту земљу већ постоји');
      else alert('дошло је до грешке');
    });
  }

  proveraLozinke(pass: string) {
    let malo = new RegExp(".[a-z]{1,}.[a-z]{1,}.[a-z]{1,}.*");
    let veliko = new RegExp("[A-Z]{1,}");
    let cifra = new RegExp(".[0-9]{1,}.[0-9]{1,}.*");
    let special = new RegExp(/[\!\@\#\$\%\^\&\\(\)\_\+\=\[\]\{\}\;\:\\\|\,\.\<\>\?]{1,}.[\!\@\#\$\%\^\&\*\(\)\_\+\=\[\]\{\}\;\:\\\|\,\.\<\>\?]{1,}/);
    let prvi = new RegExp('^[a-zA-Z]');
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
}
