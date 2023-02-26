import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ekipa } from './models/ekipa';
import { Rezultat } from './models/rezultat';
import { RezultatGrupni } from './models/rezultatGrupni';
import { RezultatTenis } from './models/rezultatTenis';

@Injectable({
  providedIn: 'root'
})
export class TakmicenjeService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  dodajTakmicenje(sport, disciplina, pol, pocetakDan, pocetakMesec,
    krajDan, krajMesec, lokacije, format, delegat, broj){
      let prazan  = [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    const data = {
      id: broj,
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      pocetakDan: pocetakDan,
      pocetakMesec: pocetakMesec,
      krajDan: krajDan,
      krajMesec: krajMesec,
      lokacije: lokacije,
      format: format,
      vreme: "",
      vremeDan: 0,
      vremeMesec: "",
      delegat: delegat,
      lokacija: "",
      zavrseno: 0,
      sportisti: [], 
      vremeG: prazan,
      danG : prazan,
      mesecG : prazan,
      lokacijaG : prazan
    }
    return this.http.post(`${this.uri}/takmicenje/dodajTakmicenje`, data);
  }

  dodajVremeMesto(sport, disciplina, pol, vreme, vremeDan, vremeMesec, lokacija){
    const data = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      vreme: vreme,
      vremeDan: vremeDan,
      vremeMesec: vremeMesec,
      lokacija: lokacija
    }

    return this.http.post(`${this.uri}/takmicenje/dodajVremeMesto`, data);
  }

  zavrsiTakmicenje(sport, disciplina, pol){
    const data = {
      sport: sport,
      disciplina: disciplina,
      pol: pol
    }

    return this.http.post(`${this.uri}/takmicenje/zavrsiTakmicenje`, data);
  }

  promeniVremeUtakmica(sport, disciplina, pol, vreme, vremeDan, vremeMesec, lokacija){
    const data = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      vreme: vreme,
      vremeDan: vremeDan,
      vremeMesec: vremeMesec,
      lokacija: lokacija
    }

    return this.http.post(`${this.uri}/takmicenje/promeniVremeUtakmica`, data);
  }

  dohvatiTakmicenja(delegat){
    const data = {
      delegat: delegat
    }
    return this.http.post(`${this.uri}/takmicenje/dohvatiTakmicenja`, data);
  }

  dohvatiSvaTakmicenja(){
    return this.http.get(`${this.uri}/takmicenje/getAll`);
  }

  dodajTakmicare(sport, disciplina, sportisti){
    const data = {
      sport: sport,
      disciplina: disciplina,
      sportisti: sportisti
    }
    return this.http.post(`${this.uri}/takmicenje/dodajTakmicare`, data);
  }

  dodajOsnovu(id, sport, disciplina, pol, format, ime){
    let rez = new Rezultat();
    rez.id = id;
    rez.sport = sport;
    rez.disciplina = disciplina;
    rez.pol = pol;
    rez.format = format;
    rez.ime = ime;
    rez.mm = 0;
    rez.ss = 0;
    rez.tt = 0;
    rez.metar1 = 0;
    rez.centi1 = 0;
    rez.metar2 = 0;
    rez.centi2 = 0;
    rez.metar3 = 0;
    rez.centi3 = 0;
    rez.cc = 0;
    rez.krug = 0;
    return this.http.post(`${this.uri}/rezultat/dodajOsnovu`, rez);
  }

  dodajRezultate(sport, disciplina, sportisti){
    const data = {
      sport: sport,
      disciplina: disciplina,
      sportisti: sportisti
    }
    return this.http.post(`${this.uri}/rezultat/dodajRezultate`, data);
  }

  dohvatiRezultate(){
    return this.http.get(`${this.uri}/rezultat/dohvatiRezultate`);
  }

  dohvatiNeke(sport, disciplina, pol){
    const data = {
      sport: sport,
      disciplina: disciplina,
      pol: pol
    }
    return this.http.post(`${this.uri}/rezultat/dohvatiNeke`, data);
  }

  azurirajRezultate(rez: Rezultat){
    const data = {
      sport: rez.sport,
      disciplina: rez.disciplina,
      ime: rez.ime,
      mm: rez.mm,
      ss: rez.ss,
      tt: rez.tt,
      metar1: rez.metar1,
      centi1: rez.centi1,
      metar2: rez.metar2,
      centi2: rez.centi2,
      metar3: rez.metar3,
      centi3: rez.centi3,
      cc: rez.cc,
      krug: rez.krug
    }
    return this.http.post(`${this.uri}/rezultat/azuriraj`, data);
  }

  dohvatiEkipe(){
    return this.http.get(`${this.uri}/ekipa/getAll`);
  }

  dodajClana(sport, disciplina, pol, zemlja, niz){
    const data = {
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      zemlja: zemlja,
      niz: niz
    }
    return this.http.post(`${this.uri}/ekipa/dodajClana`, data);
  }

  dodajEkipu(ekipa: Ekipa){
    return this.http.post(`${this.uri}/ekipa/dodajEkipu`, ekipa);
  }

  dodajEkipe(id, sport, pol, ekipe){
    let data = {
      id: id,
      sport: sport,
      pol: pol,
      ekipe: ekipe
    }
    return this.http.post(`${this.uri}/rezultatGrupni/dodajEkipe`, data);
  }

  dodajOsnovuGrupni(id, sport, pol, format, ekipe){
    let rez = new RezultatGrupni();
    rez.id = id;
    rez.sport = sport;
    rez.pol = pol;
    rez.format = format;
    rez.ekipe = ekipe;
    rez.prosliA = rez.prosliB = rez.prosliCetvrt = ['','','',''];
    rez.prosliPola = ['','', '', ''];
    rez.grupaA = rez.grupaB = 
      [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    rez.f_4 = [0,0,0,0,0,0,0,0];
    rez.f_2 = [0,0,0,0];
    rez.f = [0,0];
    rez.mecZaTrece = [0, 0];
    rez.zavrsenoA = rez.zavrsenoB = rez.zavrseno4 = rez.zavrseno2 = rez.zavrseno1 = 0;
    
    return this.http.post(`${this.uri}/rezultatGrupni/dodajOsnovu`, rez);
  }

  dohvatiRezultateGrupne(id, sport, pol){
    const data = {
      id: id,
      sport: sport,
      pol:pol
    }
    return this.http.post(`${this.uri}/rezultatGrupni/dohvatiRezultate`, data);
  }

  azurirajGrupneRezultate(id, sport, pol, grupa, data){
    const dataaa = {
      id: id,
      sport: sport,
      pol: pol,
      grupa: grupa,
      data: data
    }
    return this.http.post(`${this.uri}/rezultatGrupni/azuriraj`, dataaa);
  }

  zavrsiGrupneRezultate(id, sport, pol, faza, prosliA, prosliB, prosliCetvrt, prosliPola){
    const dataaa = {
      id: id,
      sport: sport,
      pol: pol,
      faza: faza,
      prosliA: prosliA, 
      prosliB: prosliB, 
      prosliCetvrt: prosliCetvrt, 
      prosliPola: prosliPola
    }
    return this.http.post(`${this.uri}/rezultatGrupni/zavrsi`, dataaa);
  }

  rezultatTenisOsnova(id, pol, format, ekipe){
    let rez = new RezultatTenis;
    rez.id = id;
    rez.pol = pol;
    rez.format = format;
    rez.zavrseno8 = rez.zavrseno4 = rez.zavrseno3 = rez.zavrseno2 = rez.zavrseno1 = 0;
    if(ekipe.length == 16) rez.ekipe8 = ekipe;
    else if(ekipe.length == 8) {
      rez.ekipe4 = ekipe;
      rez.zavrseno8 = 1;
    }
    else if(ekipe.length == 4) {
      rez.ekipe2 = ekipe;
      rez.zavrseno8 = rez.zavrseno4 = 1;
    }
    rez.brTakmicara = ekipe.length;
    rez.ekipe3 = rez.ekipe1 = ["", ""];
    rez.ekipe123 = ["", "", ""];
    rez.f_8 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    rez.f_4 = [0, 0, 0, 0, 0, 0, 0, 0];
    rez.f_3 = rez.f_1 = [0, 0];
    rez.f_2 = [0, 0, 0, 0];

    return this.http.post(`${this.uri}/rezultatTenis/dodajOsnovu`, rez);
  }

  dohvatiRezultateTenis(id, pol){
    const data = {
      id: id,
      pol: pol
    }
    return this.http.post(`${this.uri}/rezultatTenis/dohvatiRezultate`, data);
  }

  azurirajRezultateTenis(id, pol, sta, data){
    const dataaa = {
      id: id,
      pol: pol,
      sta: sta,
      data: data
    }
    return this.http.post(`${this.uri}/rezultatTenis/azuriraj`, dataaa);
  }

}
