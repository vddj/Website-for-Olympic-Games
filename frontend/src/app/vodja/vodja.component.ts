import { Component, OnInit } from '@angular/core';
import { Sport1 } from '../models/sport1';
import { Sportista } from '../models/sportista';
import { User } from '../models/user';
import { ZemljaService } from '../zemlja.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Ekipa } from '../models/ekipa';
import { TakmicenjeService } from '../takmicenje.service';

@Component({
  selector: 'app-vodja',
  templateUrl: './vodja.component.html',
  styleUrls: ['./vodja.component.css']
})
export class VodjaComponent implements OnInit {

  constructor(private zemljaService: ZemljaService, private formBuilder: FormBuilder, private takmicenjeService: TakmicenjeService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('user'));
    this.zemljaService.dohvatiSveSportove1().subscribe((data3: Sport1[])=>{
      this.sportovi = data3;

      this.zemljaService.dohvatiSportiste('', this.korisnik.nacionalnost, '', '', 0).subscribe((data: Sportista[])=>{
        this.sportisti1 = data;
        this.prebrojiSportiste(data, data3);
      })
    })
    this.takmicenjeService.dohvatiEkipe().subscribe((data2: Ekipa[])=>{
      this.ekipe = data2;
    })
    this.form = this.formBuilder.group({
      website: this.formBuilder.array([], [Validators.required])
    })
  }

  korisnik: User;
  ime1: string = '';
  pol: string = '';
  pol1: string = '';
  pol2: string = '';
  zemlja: string = '';
  sport: Sport1 = new Sport1();
  sport1: Sport1 = new Sport1();
  sport2: Sport1 = new Sport1();
  disciplina: string = '';
  disciplina1: string = '';
  disciplina2: string = '';
  sportovi: Sport1[] = [];
  sportisti: Sportista[] = [];
  sportisti1: Sportista[] = [];
  sportisti2: Sportista[] = [];
  ekipe: Ekipa[] = [];

  total: number;
  page: Number = 1;
  poStranici: Number = 20;

  unesiTakmicara(){
    this.zemljaService.dodajSportistu(this.ime1, this.korisnik.nacionalnost, 
      this.sport1.sport, this.disciplina1, this.pol1).subscribe(response=>{
      if(response['message']=='sportista added'){
        this.zemljaService.dodajMedalju(this.korisnik.nacionalnost, 'sportista').subscribe();
        alert('oki');
      }
      else if(response['message']=='sportista izmenjen') alert('okej');
      else if(response['message']=='ne moze taj sport') alert('спортиста се већ такмичи у другом спорту');
      else if(response['message']=='ne moze ta zemlja') alert('спортиста није из Ваше земље');
    });
  }

  prebrojiSportiste(sportisti, sportovi){
    for(let i = 0; i < sportovi.length; i++){
      let broj = 0;
      for(let j = 0; j < sportisti.length; j++){
        if(sportisti[j].sport === sportovi[i].sport) broj++;
      }
      this.sportovi[i].broj = broj;
    }
  }

  dugmezapretragu(e){
    this.zemljaService.dohvatiSportiste('', this.korisnik.nacionalnost, this.sport.sport, this.pol, 0).subscribe((data1: Sportista[])=>{
      data1.sort((a, b)=>{
        if(a.ime > b.ime) return 1;
        if(a.ime == b.ime) return 0;
        if(a.ime < b.ime) return -1;
      });
      this.sportisti = data1;
    })
  }

  dugmezapretragu2(){
    this.zemljaService.dohvatiSportiste('', this.korisnik.nacionalnost, this.sport2.sport, this.pol2, 0).subscribe((data1: Sportista[])=>{
      this.sportisti2 = data1;
    })
  }

  form: FormGroup;
  prijavi(e){
    const website: FormArray = (this.form.get('website') || []) as FormArray ;

    if (e.target.checked) {
      website.push(new FormControl(e.target.value));
    } else {
      const index = website.controls.findIndex(x => x.value === e.target.value);

      website.removeAt(index);
    }
  }

  izabrani: Array<Object> = [];

  submit(){
    //console.log(this.form.value);
    //this.izabrani = this.formBuilder.array.arguments;
    let data = JSON.parse(JSON.stringify(this.form.value, null, 4));

    let min = 0; let max = 0;
    for(let i = 0; i < this.sport2.discipline.length; i++){
      if(this.sport2.discipline[i].naziv === this.disciplina2){
        min = this.sport2.discipline[i].min_igraca;
        max = this.sport2.discipline[i].max_igraca;
      }
    }

    if(data.website.length < min || data.website.length > max){
      alert('екипа мора да садржи најмање ' + min + ' играча, а највише' + max + ' играча');
      return;
    }

    let uslov = true;
    /*for(let i = 0; i < this.ekipe.length; i++){
      if(this.ekipe[i].sport === this.sport.sport && this.ekipe[i].disciplina === this.disciplina &&
        this.ekipe[i].pol === this.pol && this.ekipe[i].zemlja === this.korisnik.nacionalnost){
          this.takmicenjeService.dodajClana(this.sport.sport, this.disciplina, this.pol, this.korisnik.nacionalnost, 
            data.website).subscribe(response=>{
                if(response['message']=='takmicari added') alert('ok');
            });
          uslov = false;
          break;
      }
    }*/
    if(uslov){
      let ekipa = new Ekipa;
      ekipa.sport = this.sport2.sport;
      ekipa.disciplina = this.disciplina2;
      ekipa.pol = this.pol2;
      ekipa.zemlja = this.korisnik.nacionalnost;
      ekipa.brojPobeda = 0;
      ekipa.igraci = data.website;
      this.takmicenjeService.dodajEkipu(ekipa).subscribe((response)=>{
        if(response['message']=='ekipa added') alert('екипа је додата');
      });
    }
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value, null, 4));
  }

  sportPretraga(sport){
    this.sport = sport;
  }

}
