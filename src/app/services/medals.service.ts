import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Medal } from '../medal/medal';

@Injectable({
  providedIn: 'root'
})
export class MedalsService {

  constructor() { }

  getMedals(): Observable<Medal[]> {
    const data: Medal[] = [
      { country: 'France', gold: 4, silver: 6, bronze: 5 },
      { country: 'USA', gold: 7, silver: 5, bronze: 6 },
      { country: 'Japan', gold: 3, silver: 2, bronze: 4 },
      { country: 'Libya', gold: 5, silver: 1, bronze: 0 },
      { country: 'Algeria', gold: 6, silver: 4, bronze: 1 },
      { country: 'Morocco', gold: 7, silver: 1, bronze: 2 },
      { country: 'Tunisia', gold: 3, silver: 2, bronze: 1 },
      { country: 'Egypt', gold:4, silver: 2, bronze: 3 }
    ];
    return of(data);
  }
}
