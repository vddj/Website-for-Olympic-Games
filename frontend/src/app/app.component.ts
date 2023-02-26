import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
//import { BreadcrumbService, Breadcrumb } from 'angular-crumbs'
//import { Title } from '@angular/platform-browser';
//import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router/*, private breadcrumbService: BreadcrumbService, private titleService: Title*/) { }

  ngOnInit(): void {
    //localStorage.clear();
    //this.imamoKorisnika = false;
  }
  /*
  ngOnInit(): void {
    this.breadcrumbService.breadcrumbChanged.subscribe(crumbs =>{
      this.titleService.setTitle(this.createTitle(crumbs));
    })
  }
  
  createTitle(routesCollection: Breadcrumb[]){
    const title = 'Agular Demo';
    const titles = routesCollection.filter((route)=> route.displayName);
    if(!title.length) return title;
    const routeTitle = this.titlesToString(titles);
  }
  
  getAnimationData(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  titlesToString(titles){
    return titles.reduce((prev, curr)=>{
      return `${curr.displayName} - ${prev}`
    })
  }*/

  odrediProfil() {
    this.korisnik = JSON.parse(localStorage.getItem('user'));
    if(this.korisnik){
      this.imamoKorisnika = true;
      if(this.korisnik.type == 0) this.router.navigate(['user']);
      else if(this.korisnik.type == 1) this.router.navigate(['admin']);
      else if(this.korisnik.type == 2) this.router.navigate(['delegat']);
      else if(this.korisnik.type == 3) this.router.navigate(['vodja']);
    }
    else this.router.navigate(['login']);
  }
  odjaviSe(){
    localStorage.clear();
    this.imamoKorisnika = false;
    //window.location.reload();
    this.router.navigate(['login']);
  }

  korisnik: User;
  imamoKorisnika: boolean = false;

}
