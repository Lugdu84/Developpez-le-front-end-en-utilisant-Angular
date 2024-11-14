import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryChart } from '@models/CountryChart';
import { OlympicService } from '@services/olympic.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
})
export class CountryComponent implements OnInit {
  public country$!: Observable<CountryChart | null>;

  private route = inject(ActivatedRoute);
  private olympicService = inject(OlympicService);

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.country$ = this.olympicService.getOlympic(+id).pipe(
      map((country) => {
        if (!country) {
          return null;
        }
        return {
          id: country.id,
          name: country.country,
          numberOfEntries: country.participations.length,
          numberOfMedals: country.participations.reduce(
            (acc, participation) => acc + participation.medalsCount,
            0
          ),
          numberOfAthletes: country.participations.reduce(
            (acc, participation) => acc + participation.athleteCount,
            0
          ),
          charts: country.participations.map((participation) => ({
            name: participation.year.toString(),
            value: participation.medalsCount,
          })),
        };
      })
    );
  }
}
