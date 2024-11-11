import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Olympic, Olympics } from '@models/Olympic';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = environment.olympicUrl;
  private olympics$ = new BehaviorSubject<Olympics>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympics>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return EMPTY;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getOlympic(id: number): Observable<Olympic | undefined> {
    return this.http.get<Olympics>(this.olympicUrl).pipe(
      map((olympics) => olympics.find((olympic) => olympic.id === id)),
      catchError((error) => {
        console.error(error);

        return EMPTY;
      })
    );
  }
}
