import { Time } from "@angular/common";

export class Takmicenje {
    id: number;
    sport: string;
    disciplina: string;
    pol: string = '';
    pocetakDan: string = '';
    pocetakMesec: string = '';
    krajDan: string = '';
    krajMesec: string = '';
    lokacije: string[] = [];
    format: number = 0;
    delegat: string;
    vreme: Time;
    vremeDan: number;
    vremeMesec:string;
    lokacija: string;
    sportisti: Array<string>;
    zavrseno: number;

    vremeG: Time[] = [];
    danG: string[] = [];
    mesecG: string[] = [];
    lokacijaG: string[] = [];
}