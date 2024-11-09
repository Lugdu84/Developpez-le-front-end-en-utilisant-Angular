import { Participations } from './Participation';

export interface Olympic {
  id: number;
  country: string;
  participations: Participations;
}

export type Olympics = Olympic[];
