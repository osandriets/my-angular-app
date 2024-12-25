import { Component, Input } from '@angular/core';
import { HeroInterface } from '../../interfaces/hero.interface';
import { CommonModule, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss'],
  imports: [
    KeyValuePipe,
    CommonModule,
  ],
})
export class KpiComponent {
  @Input() data: HeroInterface[] = [];
  @Input() field!: keyof HeroInterface;

  isUnic = true;

  constructor() {
  }

  getUniqueValues(data: any): any[] {
    return data.map((i: HeroInterface) => {
      return i[this.field];
    }).reduce((acc: any, key: string) => {
      return acc.set(key, acc.has(key) ? acc.get(key)+ 1: 1);
    }, new Map);
  }

  total(items: any):  number {
    return items.reduce((acc: number, num: any) => acc + num.value, 0);
  }
}
