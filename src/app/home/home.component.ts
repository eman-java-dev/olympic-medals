// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedalsService } from '../services/medals.service';
import { Medal } from '../medal/medal';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  rows: Medal[] = [];
  totalGold = 0;
  totalSilver = 0;
  totalBronze = 0;

  constructor(private readonly medalsService: MedalsService) {}

  ngOnInit(): void {
    this.loadMedals();
  }

  private loadMedals(): void {
    this.medalsService.getMedals().subscribe((data: Medal[]) => {
      this.rows = data;
      this.totalGold   = data.reduce((sum, r) => sum + r.gold,   0);
      this.totalSilver = data.reduce((sum, r) => sum + r.silver, 0);
      this.totalBronze = data.reduce((sum, r) => sum + r.bronze, 0);
    });
  }

  // (اختياري) لتحسين *ngFor
  trackByCountry(_: number, item: Medal): string {
    return item.country;
  }
}
