import { Component, OnInit, signal } from '@angular/core';
import { map, Observable, of, take, tap } from 'rxjs';
import { OlympicService } from '@services/olympic.service';
import { Chart, Charts } from '@models/Chart';
import { Router } from '@angular/router';

type ChartWithId = Chart & { id: number };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  protected numberOfCountries = signal(0);
  protected numberOfJo = signal(0);
  protected olympics$: Observable<ChartWithId[]> = of([]);

  constructor(private olympicService: OlympicService, private router: Router) {}

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
          id: olympic.id,
          name: olympic.country,
          value: olympic.participations.reduce(
            (acc, participation) => acc + participation.medalsCount,
            0
          ),
        }))
      )
    );
  }

  navigateToCountry(data: Chart): void {
    this.olympics$
      .pipe(
        take(1),
        map((olympics) =>
          olympics.find((olympic) => olympic.name === data.name)
        ),
        tap((olympic) => {
          if (!olympic) {
            return;
          }
          this.router.navigateByUrl(`country/${olympic.id}`);
        })
      )
      .subscribe();
  }
}
