import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { HeroInterface } from '../interfaces/hero.interface';

@Injectable()
export class HeroService {
  private URL = '../wikipedia_marvel_data.json';

  readonly http = inject(HttpClient);

  async loadAllCourses(): Promise<HeroInterface[]> {
    const courses$ =
      this.http.get<HeroInterface[]>(this.URL);
    const response = await firstValueFrom(courses$);
    return response.map(i => ({
      ...i,
      uuid: uuidv4(),
    }));
  }

}
