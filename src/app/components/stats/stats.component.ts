import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
})
export class StatsComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: number;
}
