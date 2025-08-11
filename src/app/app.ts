// استيراد مكوّنات وأنواع من Angular
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
// استيراد الخدمة ونوع البيانات
import { MedalsService } from './services/medals.service';
import { Medal } from './medal/medal';

// 🏠 مكوّن التطبيق الرئيسي (AppComponent)
@Component({
  selector: 'app-root', // اسم العنصر الذي سيتم وضعه في index.html
  standalone: true,     // مكوّن مستقل لا يحتاج Module
  imports: [
    RouterOutlet,       // لعرض الصفحات حسب المسار
    RouterLink,         // لتفعيل الروابط
    RouterLinkActive,   // لتحديد الرابط النشط
    CommonModule,       // لتشغيل *ngFor و *ngIf وغيرها
    NavbarComponent,    // ✅ أضفنا الـ Navbar
  ],
  templateUrl: './app.html', // ملف القالب (HTML)
  styleUrls: ['./app.css']   // ملف التنسيقات (CSS)
})
export class AppComponent implements OnInit {
  // 🗓️ السنة الحالية لعرضها في الـ Footer
  year = new Date().getFullYear();

  // 🏅 البيانات القادمة من الخدمة
  medalRows: Medal[] = []; // مصفوفة الصفوف (الدول + الميداليات)

  // 🏆 مجاميع الميداليات (تبدأ من صفر لعمل الأنيميشن)
  totalGold = 0;
  totalSilver = 0;
  totalBronze = 0;

  // 🔍 حالة البحث (النص الذي يكتبه المستخدم في خانة البحث)
  private searchTerm = '';

  // 💉 حقن خدمة MedalsService للحصول على البيانات
  constructor(private medalsService: MedalsService) {}

  // 📥 تنفيذ عند تحميل المكوّن
  ngOnInit(): void {
    // جلب البيانات من الخدمة
    this.medalsService.getMedals().subscribe((data: Medal[]) => {
      this.medalRows = data;

      // نحسب القيم النهائية
      const finalGold   = data.reduce((s, m) => s + m.gold,   0);
      const finalSilver = data.reduce((s, m) => s + m.silver, 0);
      const finalBronze = data.reduce((s, m) => s + m.bronze, 0);

      // نشغل أنيميشن زيادة الأرقام
      this.animateCounter('gold', finalGold, 800);
      this.animateCounter('silver', finalSilver, 800);
      this.animateCounter('bronze', finalBronze, 800);
    });
  }

  // 🖊️ تحديث حالة البحث عند كتابة المستخدم
  onSearch(value: string) {
    this.searchTerm = value.trim().toLowerCase();
  }

  // 📊 إرجاع الصفوف بعد تطبيق الفلترة حسب البحث
  get filteredRows(): Medal[] {
    if (!this.searchTerm) return this.medalRows;
    return this.medalRows.filter(r =>
      r.country.toLowerCase().includes(this.searchTerm)
    );
  }

  // 🎯 دالة أنيميشن للعد التدريجي
  private animateCounter(type: 'gold' | 'silver' | 'bronze', finalValue: number, duration: number) {
    let startValue = 0;
    const increment = Math.ceil(finalValue / (duration / 16)); // زيادة كل 16ms
    const interval = setInterval(() => {
      if (startValue >= finalValue) {
        startValue = finalValue;
        clearInterval(interval);
      }
      if (type === 'gold') this.totalGold = startValue;
      if (type === 'silver') this.totalSilver = startValue;
      if (type === 'bronze') this.totalBronze = startValue;
      startValue += increment;
    }, 16);
  }

  // ⬇️ تصدير البيانات كملف CSV
  exportCSV() {
    const rows = this.filteredRows;
    if (!rows.length) return;

    const header = ['Country', 'Gold', 'Silver', 'Bronze', 'Total'];
    const lines = rows.map(r => [
      r.country,
      r.gold,
      r.silver,
      r.bronze,
      r.gold + r.silver + r.bronze
    ]);

    const csv = [
      '\uFEFF' + header.join(','),
      ...lines.map(arr => arr.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'medals.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
