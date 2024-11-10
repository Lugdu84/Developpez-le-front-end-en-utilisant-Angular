import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { map, Observable, of, pipe, tap } from 'rxjs';
import { OlympicService } from '@services/olympic.service';
import { Olympics } from '@models/Olympic';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Charts } from '@models/Chart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  protected numberOfCountries = signal(0);
  protected numberOfJo = signal(0);
  protected olympics$: Observable<Charts> = of([]);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics().pipe(
      tap((olympics) => {
        this.numberOfCountries.set(olympics.length);
        this.numberOfJo.set(
          olympics.reduce(
            (acc, olympic) =>
              acc +
              olympic.participations.filter((p) => p.medalsCount > 0).length,
            0
          )
        );
      }),
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
