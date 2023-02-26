import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  signInService(username: string, password: string){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/users/login`, data);
  }

  registruj(username, ime, prezime, password, mail, nacional, type){
    const data = {
      username: username,
      password: password,
      ime: ime,
      prezime: prezime,
      nacional: nacional,
      mail: mail,
      type: type,
      odobrenje: 0
    }

    return this.http.post(`${this.uri}/users/registerleader`, data);
  }

  registrujSe(user: User){
    return this.http.post(`${this.uri}/users/registerleader`, user);
  }

  dohvatiDelegate(){
    return this.http.get(`${this.uri}/users/dohvatiDelegate`);
  }

  promeniLozinku(username, lozinka, nova){
    const data = {
      username: username,
      lozinka: lozinka,
      nova: nova
    }
    return this.http.post(`${this.uri}/users/promeniLozinku`, data);
  }

  dohvatiNeprihvacene(){
    return this.http.get(`${this.uri}/users/dohvatiNeprihvacene`);
  }

  prihvatiZahtev(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/prihvatiZahtev`, data);
  }

}
