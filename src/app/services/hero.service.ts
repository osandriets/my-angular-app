import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { HeroInterface } from '../interfaces/hero.interface';

@Injectable()
export class HeroService {
  // private URL = '../wikipedia_marvel_data.json';
  private URL = 'http://localhost:9000/api/heroes';

  readonly http = inject(HttpClient);

  async loadAllHeroes(): Promise<HeroInterface[]> {
    const heroes$ =
      this.http.get<HeroInterface[]>(this.URL);
    const response = await firstValueFrom(heroes$);
    return response.map(i => ({
      ...i,
      uuid: uuidv4(),
    }));
  }

  async createHero(hero: Partial<HeroInterface>) : Promise<HeroInterface> {
    const heroes$ =
      this.http.post<HeroInterface>(this.URL, hero)
    return firstValueFrom(heroes$);
  }

  async saveHero(heroLaber:string,
                 changes: Partial<HeroInterface>) : Promise<HeroInterface> {
    const heroe$ =
      this.http.put<HeroInterface>(`${this.URL}/${heroLaber}`,
        changes)
    return firstValueFrom(heroe$);
  }

  async deleteHero(heroLaber:string) {
    const delete$ =
      this.http.delete(`${this.URL}/${heroLaber}`);
    return firstValueFrom(delete$);
  }
}
