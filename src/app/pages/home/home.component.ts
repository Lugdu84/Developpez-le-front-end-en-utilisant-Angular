import { Component, OnInit } from '@angular/core';
import { map, Observable, of, pipe, tap } from 'rxjs';
import { OlympicService } from '@services/olympic.service';
import { Olympics } from '@models/Olympic';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Charts } from '@models/chart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  numberOfCountries!: number;
  numberOfJo!: number;
  public olympics$: Observable<Charts> = of([]);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics().pipe(
      tap((value) => console.log(value)),
      map((olympics) =>
        olympics.map((olympic) => ({
          name: olympic.country,
          value: olympic.participations.reduce(
            (acc, participation) => acc + participation.medalsCount,
            0
          ),
        }))
      )
    );
  }
}
