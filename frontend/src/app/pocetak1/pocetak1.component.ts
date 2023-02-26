import { Component, OnInit } from '@angular/core';
import { Disciplina } from '../models/disciplina';
import { Sport1 } from '../models/sport1';
import { Sportista } from '../models/sportista';
import { Zemlja } from '../models/zemlja';
import { ZemljaService } from '../zemlja.service';


@Component({
  selector: 'app-pocetak1',
  templateUrl: './pocetak1.component.html',
  styleUrls: ['./pocetak1.component.css']
})
export class Pocetak1Component implements OnInit {

  constructor(private zemljaService: ZemljaService) { }

  ngOnInit(): void {
 

    this.zemljaService.pokupiSveZemlje().subscribe((data:Zemlja[])=>{
      this.zemlje = data;
      this.total = data.length;
    });

    this.zemljaService.dohvatiSveSportove1().subscribe((data3: Sport1[])=>{
      this.sportovi1 = data3;
    })
  }

  zemlje: Zemlja[];
  sportisti: Sportista[];
  prikazaniSportisti: Sportista[];
  sportovi1: Sport1[] = [];
  discipline: Disciplina[] = [];
  prikazaniSportovi: string[] = [];
  duzina: number = 0;

  ime: string = '';
  zemlja: string = '';
  sport: string = '';
  sport1: Sport1 = new Sport1;
  disciplina: string = '';
  pol: string = '';
  
  total: number;
  page: Number = 1;
  total1: number;
  page1: Number = 1;
  total2: number;
  page2: Number = 1;
  poStranici: Number = 2;

  promeniBroj(broj: number){
    this.poStranici = broj;
  }

}
