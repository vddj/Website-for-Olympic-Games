import { Disciplina } from "./disciplina";

export class Sportista{
    id: number;
    ime: string;
    zemlja: string;
    sport: string;
    pol: string;
    medalja: string;
    discipline: Array<Disciplina> = [];
}