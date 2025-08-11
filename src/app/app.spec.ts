// src/app/app.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AppComponent } from './app';
import { MedalsService } from './services/medals.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // لأن AppComponent standalone يكفينا استيراده هنا
      imports: [AppComponent],
      // راوتر فارغ حتى تعمل توجيهات RouterLink/RouterOutlet
      providers: [
        provideRouter([]),
        // Mock للخدمة حتى لا نعمل HTTP فعليًا
        { provide: MedalsService, useValue: { getMedals: () => of([]) } }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the navbar brand text', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // عدّل النص هنا لو غيّرتِه في <app-navbar>
    expect(compiled.textContent).toContain('Olympic Medals');
  });
});
