import { Component, OnInit } from '@angular/core';
import { Rekord } from '../models/rekord';
import { Takmicenje } from '../models/takmicenje';
import { ZemljaService } from '../zemlja.service';
import { Sport1 } from '../models/sport1';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Sportista } from '../models/sportista';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Rezultat } from '../models/rezultat';
import { TakmicenjeService } from '../takmicenje.service';
import { Lokacija } from '../models/lokacija';
import { Ekipa } from '../models/ekipa';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private zemljaServis: ZemljaService, private userService: UserService, private formBuilder: FormBuilder,
    private takmicenjeServis: TakmicenjeService) { }
  sport: string;
  disciplina: string;
  vrsta: string;
  min_igraca: number;
  max_igraca: number;

  dani: string[] = [];
  meseci: string[] = ["јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"];

  rekordi: Rekord[];
  sportovi: Sport1[];
  delegati: User[];
  lokacije: Lokacija[];

  ngOnInit(): void {
    this.userService.dohvatiDelegate().subscribe((data: User[])=>{
      this.delegati = data;
    })
    this.zemljaServis.dohvatiSveSportove1().subscribe((data3: Sport1[])=>{
      this.sportovi = data3;
    })
    this.zemljaServis.dohvatiRekorde().subscribe((rekordi: Rekord[])=>{
      this.rekordi = rekordi;
    })
    this.takmicenjeServis.dohvatiSvaTakmicenja().subscribe((data: Takmicenje[])=>{
      this.takmicenja = data;
      this.takmicenja1 = data;
    })
    this.zemljaServis.pokupiSveLokacije().subscribe((data2: Lokacija[])=>{
      this.lokacije = data2;
    })
    this.userService.dohvatiNeprihvacene().subscribe((data: User[])=>{
      this.neprihvaceni = data;
    })
    for(let i = 1; i < 32; i++){
      this.dani.push(i.toString());
    }
    this.form = this.formBuilder.group({
      website: this.formBuilder.array([], [Validators.required])
    })
    this.form1 = this.formBuilder.group({
      website: this.formBuilder.array([], [Validators.required])
    })
  }

  Tsport: Sport1 = new Sport1();
  TpomocniSport: Sport1 = new Sport1();
  Tdisciplina: string = '';
  Tpol: string = '';
  pocetakDan: string = '';
  pocetakMesec: string = '';
  krajDan: string = '';
  krajMesec: string = '';
  lokacijeOdabrane: string[] = [];
  format: number = 0;
  delegat: string = '';
  neprihvaceni: User[] = [];

  uradi(){}

  dodajSport(){
    this.zemljaServis.dodajSport(this.sport,this.disciplina, this.vrsta, this.min_igraca, this.max_igraca)
      .subscribe((response)=>{
        if(response['message']=='sport added') alert('sport dodat');
        else if(response['message']=='disciplina added') alert('disciplina dodata');
        else if(response['message']=='disciplina postoji') alert('vec postoji');
      });
  }

  sportisti: Sportista[] = [];
  takmicenja: Takmicenje[];
  trenutnoTakmicenje: Takmicenje = new Takmicenje;
  ekipe: Ekipa[] = [];
  takmicenja1: Takmicenje[];
  trenutnoTakmicenje1: Takmicenje = new Takmicenje;

  dohvatiSportiste(){

    if(this.format != 1){
      this.zemljaServis.dohvatiSportiste('', '', this.Tsport.sport, this.Tpol, 0).subscribe((data: Sportista[])=>{
        this.sportisti = data;
      })
      this.form = this.formBuilder.group({
        website: this.formBuilder.array([], [Validators.required])
      })
    }
    else{
      this.takmicenjeServis.dohvatiEkipe().subscribe((ekipe: Ekipa[])=>{
        this.ekipe = ekipe;
      })
      this.form1 = this.formBuilder.group({
        website: this.formBuilder.array([], [Validators.required])
      })
    }
  }
  dohvatiEkipe(){
    this.takmicenjeServis.dohvatiEkipe().subscribe((ekipe: Ekipa[])=>{
      this.ekipe = ekipe;
    })
    this.form1 = this.formBuilder.group({
      website: this.formBuilder.array([], [Validators.required])
    })
  }

  form: FormGroup;
  form1: FormGroup;
  prijavi(e){
    let website: FormArray = (this.form.get('website') || []) as FormArray ;

    if (e.target.checked) {
      website.push(new FormControl(e.target.value));
    } else {
      const index = website.controls.findIndex(x => x.value === e.target.value);
      website.removeAt(index);
    }

  }
  prijavi1(e){
    const website: FormArray = (this.form1.get('website') || []) as FormArray ;

    if (e.target.checked) {
      website.push(new FormControl(e.target.value));
    } else {
      const index = website.controls.findIndex(x => x.value === e.target.value);
      website.removeAt(index);
    }
  }

  submit(){
    let broj = this.takmicenja.length + 1;
    let data = JSON.parse(JSON.stringify(this.form.value, null, 4));
    let data1 = JSON.parse(JSON.stringify(this.form1.value, null, 4));
    //alert(data + '\n' + data.website + '\n' + data.website.length);

    if(this.Tsport.sport === "" || this.Tpol === "" || this.pocetakDan === "" || 
      this.pocetakMesec === "" || (this.Tdisciplina === "" && this.format != 1) ||
      this.krajDan === "" || this.krajMesec === "" || this.lokacijeOdabrane == [] || this.format == 0 || this.delegat === ""){
        alert("нисте унели све податке, када их унесете пробајте поново");
        return;
      }

    if(this.format == 9 || this.format == 10){
      if(data.website.length != 4 && data.website.length != 8 && data.website.length != 16){
        alert("можете пријавити 4, 8 или 16 такмичара/екипа, ни више ни мање");
        return;
      }
    }
    if(this.format == 1 && data1.website.length != 12){
        alert("можете пријавити 12 екипа, ни више ни мање");
        return;
      }

    this.takmicenjeServis.dodajTakmicenje(this.Tsport.sport, this.Tdisciplina, this.Tpol, this.pocetakDan, this.pocetakMesec,
      this.krajDan, this.krajMesec, this.lokacijeOdabrane, this.format, this.delegat, broj).subscribe((takmicenje: Takmicenje)=>{
      if(takmicenje['message'] == 'takmicenje added') alert('додато такмичење');
    });
    
    if(this.format == 1){
      this.takmicenjeServis.dodajOsnovuGrupni(broj, this.Tsport.sport, this.Tpol,this.format, data1.website).subscribe();
    }

    if(this.format == 9 || this.format == 10){
      this.takmicenjeServis.rezultatTenisOsnova(broj, this.Tpol, this.format, data.website).subscribe();
    }

    if(this.format != 1 && this.format != 9 && this.format != 10){
      this.takmicenjeServis.dodajTakmicare(this.Tsport.sport, this.Tdisciplina, data.website).subscribe((takmicenje: Takmicenje)=>{
        //if(takmicenje['message'] == 'takmicari added') alert('ok');
        //else if(takmicenje['message'] == 'takmicari error') alert('jok');
      });
  
      for(let i = 0; i < data.website.length; i++){
        this.takmicenjeServis.dodajOsnovu(broj, this.Tsport.sport,
          this.Tdisciplina, this.Tpol, this.format, data.website[i]).subscribe();
      }
    } 
  }

  submit1(){
    this.submit();
  }

  prihvatiZahtev(username){
    this.userService.prihvatiZahtev(username).subscribe(odg=>{
      if(odg['message'] == 'user changed') alert('захтев је прихваћен');
    });
    window.location.reload();
  }

}
