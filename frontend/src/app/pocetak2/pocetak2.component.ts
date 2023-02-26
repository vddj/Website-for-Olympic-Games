import { Component, OnInit } from '@angular/core';
import { Disciplina } from '../models/disciplina';
import { Sport1 } from '../models/sport1';
import { Sportista } from '../models/sportista';
import { Zemlja } from '../models/zemlja';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-pocetak2',
  templateUrl: './pocetak2.component.html',
  styleUrls: ['./pocetak2.component.css']
})
export class Pocetak2Component implements OnInit {

  constructor(private zemljaService: ZemljaService) { }

  ngOnInit(): void {
    this.pomocniSport.sport = '';
    this.zemljaService.pokupiSveZemlje().subscribe((data:Zemlja[])=>{
      this.zemlje = data;
      this.total = data.length;
    });
    this.zemljaService.dohvatiSportiste("", "", "", "", 0).subscribe((data1: Sportista[])=>{
      this.sportisti = data1;
      this.prikazaniSportisti = data1;
      this.total = data1.length;
    })

    this.zemljaService.dohvatiSveSportove1().subscribe((data3: Sport1[])=>{
      this.sportovi = data3;
    })
  }

  zemlje: Zemlja[];
  sportisti: Sportista[];
  prikazaniSportisti: Sportista[] = [];
  sportovi: Sport1[] = [];
  prikazaniSportovi: string[] = [];
  duzina: number = 0;

  ime: string = '';
  zemlja: string = '';
  sport: Sport1 = new Sport1();
  pomocniSport: Sport1 = new Sport1();
  disciplina: string = '';
  pol: string = '';
  medalja: boolean = false;
  
  total: number;
  page: Number = 1;
  poStranici: Number = 20;

  pretrazi(){
    let checkB = 0;
    if(this.medalja == true) checkB = 1;
    //alert(this.ime+' | '+this.zemlja+' | '+this.sport.sport+' | '+this.disciplina+' | '+this.pol);
    if(this.sport === this.pomocniSport){
      this.zemljaService.dohvatiSportiste(this.ime, this.zemlja, '', this.pol, checkB).subscribe((data: Sportista[])=>{
        if(this.disciplina === '' || this.disciplina === "Све дисциплине") {
          this.prikazaniSportisti = data;
        }
        else {
          this.prikazaniSportisti = [];
          for(let i = 0; i < data.length; i++){
            let uslov = false;
            for(let j = 0; j < data[i].discipline.length; j++){
              if(data[i].discipline[j].naziv === this.disciplina){
                uslov = true; break;
              }
            }
            if(uslov) this.prikazaniSportisti.push(data[i]);
          }
        }
      })
    }
    else {
      this.zemljaService.dohvatiSportiste(this.ime, this.zemlja, this.sport.sport, this.pol, checkB).subscribe((data: Sportista[])=>{
        if(this.disciplina === '' || this.disciplina === "Све дисциплине") {
          this.prikazaniSportisti = data;
        }
        else {
          this.prikazaniSportisti = [];
          for(let i = 0; i < data.length; i++){
            let uslov = false;
            for(let j = 0; j < data[i].discipline.length; j++){
              if(data[i].discipline[j].naziv === this.disciplina){
                uslov = true; break;
              }
            }
            if(uslov) this.prikazaniSportisti.push(data[i]);
          }
        }
      })
    }
  }
    
  promeniBroj(broj: number){
    this.poStranici = broj;
  }

  zaMedalje(e){
    this.medalja = !this.medalja;
  }

}
