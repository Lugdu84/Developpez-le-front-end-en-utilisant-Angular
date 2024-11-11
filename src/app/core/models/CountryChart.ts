import { Charts } from './Chart';

export interface CountryChart {
  id: number;
  name: string;
  numberOfEntries: number;
  numberOfMedals: number;
  numberOfAthletes: number;
  charts: Charts;
}
