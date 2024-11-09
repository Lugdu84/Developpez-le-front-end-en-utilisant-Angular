import { Component, OnInit } from '@angular/core';
import { map, Observable, of, pipe, tap } from 'rxjs';
import { OlympicService } from '@services/olympic.service';
import { Olympics } from '@models/Olympic';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympics> = of([]);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics().pipe(
      tap((value) => console.log(value))

      // catchError((error, caught) => {
    );
  }
}
