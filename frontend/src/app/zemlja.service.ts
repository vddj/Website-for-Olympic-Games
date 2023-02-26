import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rezultat } from './models/rezultat';

@Injectable({
  providedIn: 'root'
})
export class ZemljaService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  pokupiSveZemlje(){
    return this.http.get(`${this.uri}/zemlja/getAll`);
  }

  pokupiSveLokacije(){
    return this.http.get(`${this.uri}/zemlja/getLokacije`);
  }

  dodajMedalju(ime, medalja){
    const data = {
      ime: ime,
      medalja: medalja
    }

    return this.http.post(`${this.uri}/zemlja/dodajMedalju`, data);
  }

  dohvatiSportiste(ime, zemlja, sport, pol, medalja){
    const data = {
      ime: ime,
      zemlja: zemlja,
      sport: sport,
      pol: pol,
      medalja: medalja
    }
    return this.http.post(`${this.uri}/sportista/dohvatiSportiste`, data);
  }

  dohvatiSveSportove(){
    return this.http.get(`${this.uri}/sport/dohvatiSportove`);
  }

  dohvatiSveSportove1(){
    return this.http.get(`${this.uri}/sport/dohvatiSportove1`);
  }

  dodajSport(sport, disciplina, vrsta, min_igraca, max_igraca){
    const data = {
      sport: sport,
      disciplina: disciplina,
      vrsta: vrsta,
      min_igraca: min_igraca,
      max_igraca: max_igraca
    }

    return this.http.post(`${this.uri}/sport/dodajSport`, data);
  }

  dodajSportistu(ime, zemlja, sport, disciplina, pol){
    const data = {
      ime: ime,
      zemlja: zemlja,
      sport: sport,
      pol: pol,
      medalja: "ne",
      discipline: [{
        naziv: disciplina,
        prijavljen: 'ne'
      }],
      disciplina: disciplina
    }

    return this.http.post(`${this.uri}/sportista/dodajSportistu`, data);
  }

  azurirajSportistu(ime, disciplina){
    const data = {
      ime: ime,
      disciplina: disciplina
    }

    return this.http.post(`${this.uri}/sportista/azurirajSportistu`, data);
  }

  dohvatiRekorde(){
    return this.http.get(`${this.uri}/sportista/dohvatiRekorde`);
  }

  dodajVreme(name, vreme, dan, mesec){
    const data = {
      name: name,
      vreme: vreme + dan + mesec
    }
    return this.http.post(`${this.uri}/zemlja/dodajVreme`, data);
  }
  

}


