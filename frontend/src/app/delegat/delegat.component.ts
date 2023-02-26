import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Ekipa } from '../models/ekipa';
import { Rezultat } from '../models/rezultat';
import { RezultatGrupni } from '../models/rezultatGrupni';
import { RezultatTenis } from '../models/rezultatTenis';
import { Sport1 } from '../models/sport1';
import { Sportista } from '../models/sportista';
import { Takmicenje } from '../models/takmicenje';
import { User } from '../models/user';
import { TakmicenjeService } from '../takmicenje.service';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-delegat',
  templateUrl: './delegat.component.html',
  styleUrls: ['./delegat.component.css']
})
export class DelegatComponent implements OnInit {

  constructor(private zemljaService: ZemljaService, private takmicenjeService: TakmicenjeService) { }

  ngOnInit(): void {
    let korisnik = new User;
    korisnik = JSON.parse(localStorage.getItem('user'));
    this.zemljaService.dohvatiSveSportove1().subscribe((data3: Sport1[])=>{
      this.sportovi1 = data3;
    })
    this.takmicenjeService.dohvatiTakmicenja(korisnik.username).subscribe((data: Takmicenje[])=>{
      this.takmicenja = data;
    })
    this.takmicenjeService.dohvatiEkipe().subscribe((ekipe: Ekipa[])=>{
      this.ekipe = ekipe;
    })
    for(let i = 1; i < 32; i++){
      this.dani.push(i.toString());
    }
    for(let i = 0; i < 15; i++) this.niz[i] = i;
    for(let i = 0; i < 4; i++) this.niz1[i] = i;
    for(let i = 0; i < 2; i++) this.niz2[i] = i;
    let rez = new Rezultat;
    this.odabraniRez.push(rez);
    
    this.formati = ["", "2 групе (А, Б)-6 екипа", "8 такмичара (СС,ТТ)", "8 такмичара (ММ:СС,ТТ)", "8 такмичара (М,ЦМ)",
    "8 такмичара (ММ,ЦМ)", "8 такмичара (ЧЧ:ММ:СС)", "до 8 такмичара (М,ЦМ)", "до 8 такмичара-кругови",
    "4/8/16 учесника-жреб", "4/8/16 парова-жреб"];
    this.inicijalizacija();
  }

  ngOnIt(): void {}

  ime: string;
  zemlja: string;
  sport: string;
  disciplina: string;
  pol: string;

  sportovi1: Sport1[] = [];
  takmicenja: Takmicenje[];
  rezultati: Rezultat[];
  odabraniRez: Rezultat[] = [];
  odabranoTakm: Takmicenje = new Takmicenje;
  formati: string[];
  ekipe: Ekipa[];
  rezultatGrupni: RezultatGrupni = new RezultatGrupni;
  rezultatTenis: RezultatTenis = new RezultatTenis;
  brojevi1: number[] = [1, 2, 3, 4, 5];
  brojevi2: number[] = [2, 3, 4, 5];
  brojevi3: number[] = [3, 4, 5];
  brojevi4: number[] = [4, 5];
  brojevi5: number[] = [5];
  brojevi6: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  brojevi7: number[] = [0, 1, 2, 3];
  brojevi8: number[] = [0, 1];
  brojevi9: number[] = [1, 2, 3, 4, 5, 6];
  niz: number[] = [];
  niz1: number[] = [];
  niz2: number[] = [];
  meseci: string[] = ["јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"];
  dani: string[] = [];

  uradi(e){
    if(this.odabranoTakm.format != 1 && this.odabranoTakm.format != 9 && this.odabranoTakm.format != 10) {
      this.takmicenjeService.dohvatiNeke(this.odabranoTakm.sport, this.odabranoTakm.disciplina, 
        this.odabranoTakm.pol).subscribe((data: Rezultat[])=>{
          this.odabraniRez = data;
      });
      return;
    }
    this.inicijalizacija();

    if(this.odabranoTakm.format == 1){
      this.takmicenjeService.dohvatiRezultateGrupne(this.odabranoTakm.id, this.odabranoTakm.sport, 
        this.odabranoTakm.pol).subscribe((rez: RezultatGrupni)=>{
        this.rezultatGrupni = rez;
      })
    }
    if(this.odabranoTakm.format == 9 || this.odabranoTakm.format == 10){
      this.takmicenjeService.dohvatiRezultateTenis(this.odabranoTakm.id, 
        this.odabranoTakm.pol).subscribe((rez: RezultatTenis)=>{
          this.rezultatTenis = rez;
          //alert(this.rezultatTenis.brTakmicara);
      })
    }
  }

  sacuvaj(rez: Rezultat){
    this.takmicenjeService.azurirajRezultate(rez).subscribe((rez)=>{
      //if(rez['message'] == 'rezultati added') alert('ok');
    });
    //alert(rez.ime);
  }

  sacuvaj1(broj: number){
    
    for(let i = 0; i < this.odabraniRez.length; i++){
      if(broj == 1) this.odabraniRez[i].mm = 1;
      if(broj == 2) this.odabraniRez[i].ss = 1;
      if(broj == 3) this.odabraniRez[i].tt = 1;
      if(broj == 4) this.odabraniRez[i].cc = 1;
      if(broj == 5) this.odabraniRez[i].krug = 1;
      this.sacuvaj(this.odabraniRez[i]);
    }
  }

  sacuvajGrupne(karakter){
    let data;
    if(karakter === 'a') data = this.rezultatGrupni.grupaA;
    else if(karakter === 'b') data = this.rezultatGrupni.grupaB;
    else if(karakter === 'c') data = this.rezultatGrupni.f_4;
    else if(karakter === 'd') data = this.rezultatGrupni.f_2;
    else if(karakter === 'j') data = this.rezultatGrupni.f;
    else if(karakter === 't') data = this.rezultatGrupni.mecZaTrece;

    this.takmicenjeService.azurirajGrupneRezultate(this.rezultatGrupni.id, this.rezultatGrupni.sport,
      this.rezultatGrupni.pol, karakter, data).subscribe((rez)=>{
        if(rez['message'] == 'grupa changed') alert('ok');
      })
  }


  rasporedi(){
    let niz = this.rezultatGrupni.ekipe;
    for(let i = 0; i < 12; i++){
      let j = Math.floor(Math.random() * 11);
      let tmp = niz[i];
      niz[i] = niz[j];
      niz[j] = tmp;
    }
    this.takmicenjeService.azurirajGrupneRezultate(this.rezultatGrupni.id, this.rezultatGrupni.sport,
      this.rezultatGrupni.pol, 'e', niz).subscribe((rez)=>{
        if(rez['message'] == 'grupa changed') alert('ok');
      })
      window.location.reload();
  }

  inicijalizacija(){
    this.rezultatGrupni.ekipe = ['','','','','','','','','','','',''];
    this.rezultatGrupni.prosliA = this.rezultatGrupni.prosliB = this.rezultatGrupni.prosliCetvrt = ['','','',''];
    this.rezultatGrupni.prosliPola = ['',''];
    this.rezultatGrupni.grupaA = this.rezultatGrupni.grupaB = 
      [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
    this.rezultatGrupni.f_4 = [0,0,0,0,0,0,0,0];
    this.rezultatGrupni.f_2 = [0,0,0,0];
    this.rezultatGrupni.f = [0,0];
    this.rezultatGrupni.zavrsenoA = this.rezultatGrupni.zavrsenoB = 0;
    this.rezultatGrupni.zavrseno4 = 0;
    this.rezultatGrupni.zavrseno2 = this.rezultatGrupni.zavrseno1 = 0;

    this.rezultatTenis.pol = '';
    this.rezultatTenis.ekipe8 = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    this.rezultatTenis.ekipe4 = ["", "", "", "", "", "", "", ""];
    this.rezultatTenis.ekipe3 = this.rezultatTenis.ekipe1 = ["", ""];
    this.rezultatTenis.ekipe2 = this.rezultatTenis.ekipe123 = ["", "", "", ""];
    this.rezultatTenis.f_8 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.rezultatTenis.f_4 = [0, 0, 0, 0, 0, 0, 0, 0];
    this.rezultatTenis.f_3 = this.rezultatTenis.f_1 = [0, 0];
    this.rezultatTenis.f_2 = [0, 0, 0, 0];
    this.rezultatTenis.format = this.rezultatTenis.zavrseno8 = this.rezultatTenis.id = 0;
    this.rezultatTenis.zavrseno4 = this.rezultatTenis.zavrseno3 = 0;
    this.rezultatTenis.zavrseno2 = this.rezultatTenis.zavrseno1 = 0;
    this.rezultatTenis.brTakmicara = 0;
  }

  zavrsi(karakter){
    if(karakter === 'a') this.cetvrtFinale();
    if(karakter === 'c') this.polufinale();
    if(karakter === 'd') this.finale();
    if(karakter === 'j') this.zavrsiTakmicenje();
    this.takmicenjeService.zavrsiGrupneRezultate(this.rezultatGrupni.id, this.rezultatGrupni.sport,
      this.rezultatGrupni.pol, karakter, this.rezultatGrupni.prosliA, this.rezultatGrupni.prosliB, 
      this.rezultatGrupni.prosliCetvrt, this.rezultatGrupni.prosliPola).subscribe((rez)=>{
        if(rez['message'] == 'grupa changed'){
          if(karakter === 'a') alert('завршена групна фаза');
          if(karakter === 'c') alert('завшено четвртфинале');
          if(karakter === 'd') alert('завршено полуфинале');
          if(karakter === 'j') alert('завршено финале');
        }
      })
    //window.location.reload();
  }
  zavrsiTakmicenje() {
    this.takmicenjeService.zavrsiTakmicenje(this.odabranoTakm.sport, 
      this.odabranoTakm.disciplina, this.odabranoTakm.pol).subscribe();

    // azuriranje medalja

    if(this.odabranoTakm.format === 1){
      let m1 = ''; let m2 = ''; let m3 = '';

      if(this.rezultatGrupni.f[0] > this.rezultatGrupni.f[1]){
        m1 = this.rezultatGrupni.prosliPola[0];
        m2 = this.rezultatGrupni.prosliPola[1];
      }
      else {
        m1 = this.rezultatGrupni.prosliPola[1];
        m2 = this.rezultatGrupni.prosliPola[0];
      }
      if(this.rezultatGrupni.mecZaTrece[0] > this.rezultatGrupni.mecZaTrece[1]){
        m3 = this.rezultatGrupni.prosliPola[2];
      }
      else {
        m3 = this.rezultatGrupni.prosliPola[3];
      }

      this.odabranoTakm.sportisti.push(m1);
      this.odabranoTakm.sportisti.push(m2);
      this.odabranoTakm.sportisti.push(m3);
    } 
    else if(this.odabranoTakm.format === 2){
      this.odabranoTakm.sportisti.sort((a, b)=>{
        let ssA = 0; let ttA = 0;
        let ssB = 0; let ttB = 0;
        for(let j = 0; j < this.odabraniRez.length ; j++){
          if(a === this.odabraniRez[j].ime){
            ssA = this.odabraniRez[j].ss;
            ttA = this.odabraniRez[j].tt;
          }
          if(b === this.odabraniRez[j].ime){
            ssB = this.odabraniRez[j].ss;
            ttB = this.odabraniRez[j].tt;
          }        
        }
  
        if(ssA*100+ttA > ssB*100+ttB) return 1;
        else if(ssA*100+ttA < ssB*100+ttB) return -1;
        else return 0;
  
      });
    } 
    else if(this.odabranoTakm.format === 3){
      this.odabranoTakm.sportisti.sort((a, b)=>{
        let mmA = 0; let ssA = 0; let ttA = 0;
        let mmB = 0; let ssB = 0; let ttB = 0;
        for(let j = 0; j < this.odabraniRez.length ; j++){
          if(a === this.odabraniRez[j].ime){
            mmA = this.odabraniRez[j].mm;
            ssA = this.odabraniRez[j].ss;
            ttA = this.odabraniRez[j].tt;
          }
          if(b === this.odabraniRez[j].ime){
            mmA = this.odabraniRez[j].mm;
            ssB = this.odabraniRez[j].ss;
            ttB = this.odabraniRez[j].tt;
          }        
        }
  
        if((mmA*60+ssA)*100+ttA > (mmB*60+ssB)*100+ttB) return 1;
        else if((mmA*60+ssA)*100+ttA < (mmB*60+ssB)*100+ttB) return -1;
        else return 0;
  
      });
    }
    else if(this.odabranoTakm.format === 5 || this.odabranoTakm.format === 4){
      this.odabranoTakm.sportisti.sort((a, b)=>{
        let maxA = 0; let maxB = 0;
        for(let j = 0; j < this.odabraniRez.length ; j++){
          if(a === this.odabraniRez[j].ime){
            let rez1 = this.odabraniRez[j].metar1 * 100 + this.odabraniRez[j].centi1;
            let rez2 = this.odabraniRez[j].metar2 * 100 + this.odabraniRez[j].centi2;
            let rez3 = this.odabraniRez[j].metar3 * 100 + this.odabraniRez[j].centi3;
            maxA = rez1;
            if(maxA < rez2) maxA = rez2;
            if(maxA < rez3) maxA = rez3;
          }
          if(b === this.odabraniRez[j].ime){
            let rez1 = this.odabraniRez[j].metar1 * 100 + this.odabraniRez[j].centi1;
            let rez2 = this.odabraniRez[j].metar2 * 100 + this.odabraniRez[j].centi2;
            let rez3 = this.odabraniRez[j].metar3 * 100 + this.odabraniRez[j].centi3;
            maxB = rez1;
            if(maxB < rez2) maxB = rez2;
            if(maxB < rez3) maxB = rez3;
          }        
        }
  
        if(maxA > maxB) return -1;
        else if(maxA < maxB) return 1;
        else return 0;
  
      });
    }
    else if(this.odabranoTakm.format === 6){
      this.odabranoTakm.sportisti.sort((a, b)=>{
        let ccA = 0; let mmA = 0; let ssA = 0;
        let ccB = 0; let mmB = 0; let ssB = 0;
        for(let j = 0; j < this.odabraniRez.length ; j++){
          if(a === this.odabraniRez[j].ime){
            ccA = this.odabraniRez[j].cc;
            mmA = this.odabraniRez[j].mm;
            ssA = this.odabraniRez[j].ss;
          }
          if(b === this.odabraniRez[j].ime){
            ccB = this.odabraniRez[j].cc;
            mmB = this.odabraniRez[j].mm;
            ssB = this.odabraniRez[j].ss;
          }        
        }
  
        if((ccA*60+mmA)*60+ssA > (ccB*60+mmB)*60+ssB) return 1;
        else if((ccA*60+mmA)*100+ssA < (ccB*60+mmB)*60+ssB) return -1;
        else return 0;
  
      });
    }
    else if(this.odabranoTakm.format === 8){
      this.odabranoTakm.sportisti.sort((a, b)=>{
        let maxA = 0; let maxB = 0;
        for(let j = 0; j < this.odabraniRez.length ; j++){
          if(a === this.odabraniRez[j].ime){
            let rez1 = this.odabraniRez[j].metar1; let rez4 =  this.odabraniRez[j].centi1;
            let rez2 = this.odabraniRez[j].metar2; let rez5 = this.odabraniRez[j].centi2;
            let rez3 = this.odabraniRez[j].metar3; let rez6 = this.odabraniRez[j].centi3;
            maxA = rez1;
            if(maxA < rez2) maxA = rez2;
            if(maxA < rez3) maxA = rez3;
            if(maxA < rez4) maxA = rez4;
            if(maxA < rez5) maxA = rez5;
            if(maxA < rez6) maxA = rez6;
          }
          if(b === this.odabraniRez[j].ime){
            let rez1 = this.odabraniRez[j].metar1; let rez4 =  this.odabraniRez[j].centi1;
            let rez2 = this.odabraniRez[j].metar2; let rez5 = this.odabraniRez[j].centi2;
            let rez3 = this.odabraniRez[j].metar3; let rez6 = this.odabraniRez[j].centi3;
            maxB = rez1;
            if(maxB < rez2) maxB = rez2;
            if(maxB < rez3) maxB = rez3;
            if(maxA < rez4) maxB = rez4;
            if(maxA < rez5) maxB = rez5;
            if(maxA < rez6) maxB = rez6;
          }        
        }
  
        if(maxA > maxB) return -1;
        else if(maxA < maxB) return 1;
        else return 0;
  
      });
    }
    else if(this.odabranoTakm.format === 9){
      let m1 = ''; let m2 = ''; let m3 = '';

      if(this.rezultatTenis.f_1[0] > this.rezultatTenis.f_1[1]){
        m1 = this.rezultatTenis.ekipe1[0];
        m2 = this.rezultatTenis.ekipe1[1];
      }
      else {
        m1 = this.rezultatTenis.ekipe1[1];
        m2 = this.rezultatTenis.ekipe1[0];
      }
      if(this.rezultatTenis.f_3[0] > this.rezultatTenis.f_3[1]){
        m3 = this.rezultatTenis.ekipe3[0];
      }
      else {
        m3 = this.rezultatTenis.ekipe1[1];
      }

      this.odabranoTakm.sportisti.push(m1);
      this.odabranoTakm.sportisti.push(m2);
      this.odabranoTakm.sportisti.push(m3);
    } 

    alert("рангирани такмичари:\n" + JSON.stringify(this.odabranoTakm.sportisti));

    // azuriranje medalja
    
    if(this.odabranoTakm.format != 1){
      this.zemljaService.dohvatiSportiste('', '', this.odabranoTakm.sport, this.odabranoTakm.pol, 0)
      .subscribe((sportisti: Sportista[])=>{
        let m1 = ''; let m2 = ''; let m3 = '';
        for(let i = 0; i < sportisti.length; i++){
          //alert(JSON.stringify(sportisti[i].ime));
          if(sportisti[i].ime === this.odabranoTakm.sportisti[0]) m1 = sportisti[i].zemlja;
          else if(sportisti[i].ime === this.odabranoTakm.sportisti[1]) m2 = sportisti[i].zemlja;
          else if(sportisti[i].ime === this.odabranoTakm.sportisti[2]) m3 = sportisti[i].zemlja;
        }
        
        this.zemljaService.dodajMedalju(m1, 'zlato').subscribe();
        this.zemljaService.dodajMedalju(m2, 'srebro').subscribe();
        this.zemljaService.dodajMedalju(m3, 'bronza').subscribe();
        //alert(m1+'  |  '+m2+'  |  '+m3);
      });
    }
    else{
        this.zemljaService.dodajMedalju(this.odabranoTakm.sportisti[0], 'zlato').subscribe();
        this.zemljaService.dodajMedalju(this.odabranoTakm.sportisti[1], 'srebro').subscribe();
        this.zemljaService.dodajMedalju(this.odabranoTakm.sportisti[2], 'bronza').subscribe();
    }
    
  }

  zauzmi(){
    let pocetak = parseInt(this.odabranoTakm.pocetakDan) + this.mesec(this.odabranoTakm.pocetakMesec)*31;
    let kraj = parseInt(this.odabranoTakm.krajDan) + this.mesec(this.odabranoTakm.krajMesec)*31;
    let odabrano = parseInt(this.odabranoTakm.vremeDan.toString()) + this.mesec(this.odabranoTakm.vremeMesec)*31;
    if(!(pocetak <= odabrano && kraj >= odabrano)){
      alert('нисте одабрали добар датум');
      return;
    }

    this.zemljaService.dodajVreme(this.odabranoTakm.lokacija, this.odabranoTakm.vreme, this.odabranoTakm.vremeDan, 
      this.odabranoTakm.vremeMesec).subscribe((rez)=>{
      if(rez['message'] == 'vreme postoji') alert('локација је већ заузета, промените време');
      else if(rez['message'] == 'vreme added') {
        this.takmicenjeService.dodajVremeMesto(this.odabranoTakm.sport, this.odabranoTakm.disciplina,
          this.odabranoTakm.pol, this.odabranoTakm.vreme, this.odabranoTakm.vremeDan, 
          this.odabranoTakm.vremeMesec, this.odabranoTakm.lokacija).subscribe((rez)=>{
            if(rez['message'] == 'vreme added') alert('заузели сте локацију');
          })
      }
    })
    
  }

  stranica: number = 2;
  promenaStranice(a){
    this.stranica = a;
  }

  promeniVremeUtakmica(n){
    this.zemljaService.dodajVreme(this.odabranoTakm.lokacijaG[n], this.odabranoTakm.vremeG[n], this.odabranoTakm.danG[n], 
      this.odabranoTakm.mesecG[n]).subscribe((rez)=>{
        if(rez['message'] == 'vreme postoji') alert('локација је већ заузета, промените време');
        else if(rez['message'] == 'vreme added') {
        this.takmicenjeService.promeniVremeUtakmica(this.odabranoTakm.sport, this.odabranoTakm.disciplina, this.odabranoTakm.pol,
          this.odabranoTakm.vremeG, this.odabranoTakm.danG, this.odabranoTakm.mesecG, this.odabranoTakm.lokacijaG).subscribe((rez)=>{
          if(rez['message'] == 'vreme added') alert('заузели сте локацију');
        })
      }
    })
  }

  cetvrtFinale(){

    let n1 = [0, 0, 0, 0, 0, 0];
    let n2 = [0, 0, 0, 0, 0, 0];

    let n3 = [0, 0, 0, 0, 0, 0];
    let n4 = [0, 0, 0, 0, 0, 0];

    for(let i = 0; i < 6; i++){
      for(let j = i+1; j < 6; j++){
        if(i != j && this.rezultatGrupni.grupaA[i][j]>this.rezultatGrupni.grupaA[j][i])
          n1[i]++;
        else n1[j]++;
        if(i != j && this.rezultatGrupni.grupaB[i][j]>this.rezultatGrupni.grupaB[j][i])
          n2[i]++;
        else n2[j]++;
      }
    }
    
    for(let i = 0; i < 6; i++){
      n3[i] = n1[i];
      n4[i] = n2[i];
    }

    //n1.sort(); n2.sort();
    for(let i = 0; i < 6; i++){
      let max = n1[i];
      let maxb = n2[i];
      let poz = i;
      let pozb = i;
      for(let j = 0; j < 6; j++){
        if(n1[j] > max){
          max = n1[j];
          poz = j;
        }
        if(n2[j] > maxb){
          maxb = n2[j];
          pozb = j;
        }
      }

      n1[poz] = -1;
      this.rezultatGrupni.prosliA[i] = this.rezultatGrupni.ekipe[poz];
      n2[pozb] = -1;
      this.rezultatGrupni.prosliB[i] = this.rezultatGrupni.ekipe[pozb+6];
    }

    alert("рангиране екипе по групама:\n"+"група A\n"+ JSON.stringify(this.rezultatGrupni.prosliA) 
    + "\n" + "група Б\n"+ JSON.stringify(this.rezultatGrupni.prosliB));
  }

  polufinale(){
    //(А1 + Б4) + (Б2 + А3)
    //(Б1 + А4) + (А2 + Б3)

    if(this.rezultatGrupni.f_4[0] > this.rezultatGrupni.f_4[1]) 
      this.rezultatGrupni.prosliCetvrt[0] = this.rezultatGrupni.prosliA[0];
    else this.rezultatGrupni.prosliCetvrt[0] = this.rezultatGrupni.prosliB[3];

    if(this.rezultatGrupni.f_4[2] > this.rezultatGrupni.f_4[3]) 
      this.rezultatGrupni.prosliCetvrt[1] = this.rezultatGrupni.prosliB[1];
    else this.rezultatGrupni.prosliCetvrt[1] = this.rezultatGrupni.prosliA[2];

    if(this.rezultatGrupni.f_4[4] > this.rezultatGrupni.f_4[5]) 
      this.rezultatGrupni.prosliCetvrt[2] = this.rezultatGrupni.prosliB[0];
    else this.rezultatGrupni.prosliCetvrt[2] = this.rezultatGrupni.prosliA[3];

    if(this.rezultatGrupni.f_4[6] > this.rezultatGrupni.f_4[7]) 
      this.rezultatGrupni.prosliCetvrt[3] = this.rezultatGrupni.prosliA[1];
    else this.rezultatGrupni.prosliCetvrt[3] = this.rezultatGrupni.prosliB[2];

  }
  finale(){
    if(this.rezultatGrupni.f_2[0] > this.rezultatGrupni.f_2[1]) {
      this.rezultatGrupni.prosliPola[0] = this.rezultatGrupni.prosliCetvrt[0];
      this.rezultatGrupni.prosliPola[2] = this.rezultatGrupni.prosliCetvrt[1];
    }
    else {
      this.rezultatGrupni.prosliPola[0] = this.rezultatGrupni.prosliCetvrt[1];
      this.rezultatGrupni.prosliPola[2] = this.rezultatGrupni.prosliCetvrt[0];
    }

    if(this.rezultatGrupni.f_2[2] > this.rezultatGrupni.f_2[3]){
      this.rezultatGrupni.prosliPola[1] = this.rezultatGrupni.prosliCetvrt[2];
      this.rezultatGrupni.prosliPola[3] = this.rezultatGrupni.prosliCetvrt[3];
    }
    else {
      this.rezultatGrupni.prosliPola[1] = this.rezultatGrupni.prosliCetvrt[3];
      this.rezultatGrupni.prosliPola[3] = this.rezultatGrupni.prosliCetvrt[2];
    }
  }


  azurirajTenis(sta, data){
    this.takmicenjeService.azurirajRezultateTenis(this.rezultatTenis.id, this.rezultatTenis.pol, sta, data).subscribe((rez)=>{
      if(rez['message'] == 'grupa changed') alert('ажурирано');
    })

    if(sta === 'f_8'){ // 16 takmicara
      let prosli = ["", "", "", "", "", "", "", ""];
      for(let i = 0; i < 8; i++){
        if(data[i] > data[i+8]) prosli[i] = this.rezultatTenis.ekipe8[i];
        else prosli[i] = this.rezultatTenis.ekipe8[i+8];
      }
      this.takmicenjeService.azurirajRezultateTenis(this.rezultatTenis.id, this.rezultatTenis.pol, 'ekipe4', prosli).subscribe((rez)=>{
        if(rez['message'] == 'grupa changed') alert('ажурирано');
      })
    }
    else if(sta === 'f_4'){ // 8 takmicara
      let prosli = ["", "", "", ""];
      for(let i = 0; i < 4; i++){
        if(data[i] > data[i+4]) prosli[i] = this.rezultatTenis.ekipe4[i];
        else prosli[i] = this.rezultatTenis.ekipe4[i+4];
      }
      this.takmicenjeService.azurirajRezultateTenis(this.rezultatTenis.id, this.rezultatTenis.pol, 'ekipe2', prosli).subscribe((rez)=>{
        if(rez['message'] == 'grupa changed') alert('ажурирано');
      })
    }
    else if(sta === 'f_2'){ // 4 takmicara
      let prosli = ["", ""];
      let nisuprosli = ["", ""];
      for(let i = 0; i < 2; i++){
        if(data[i] > data[i+2]) {
          prosli[i] = this.rezultatTenis.ekipe2[i];
          nisuprosli[i] = this.rezultatTenis.ekipe2[i+2];
        }
        else {
          prosli[i] = this.rezultatTenis.ekipe2[i+2];
          nisuprosli[i] = this.rezultatTenis.ekipe2[i];
        }
      }

      this.takmicenjeService.azurirajRezultateTenis(this.rezultatTenis.id, this.rezultatTenis.pol, 'ekipe1', prosli).subscribe((rez)=>{
        if(rez['message'] == 'grupa changed') alert('ажурирано');
      })
      this.takmicenjeService.azurirajRezultateTenis(this.rezultatTenis.id, this.rezultatTenis.pol, 'ekipe3', nisuprosli).subscribe((rez)=>{
        if(rez['message'] == 'grupa changed') alert('ажурирано');
      })
    }
  }

  mesec(mesec): number{
    if(mesec === "јануар") return 1;
    else if(mesec === "фебруар") return 2;
    else if(mesec === "март") return 3;
    else if(mesec === "април") return 4;
    else if(mesec === "мај") return 5;
    else if(mesec === "јун") return 6;
    else if(mesec === "јул") return 7;
    else if(mesec === "август") return 8;
    else if(mesec === "септембар") return 9;
    else if(mesec === "октобар") return 10;
    else if(mesec === "новембар") return 11;
    else if(mesec === "децембар") return 12;
  }
}
