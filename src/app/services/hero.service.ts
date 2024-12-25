import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { HeroInterface } from '../interfaces/hero.interface';

@Injectable()
export class HeroService {
  readonly http = inject(HttpClient);

  // private _data: Subject<HeroInterface[]> = new Subject();
  // data$: Observable<HeroInterface[]> = this._data.asObservable();

  private URL = '../wikipedia_marvel_data.json';
  // private data: HeroInterface[] = [];

  constructor() {
    // this.data$.subscribe((d) => console.error('d', d));
  }

  async loadAllCourses():Promise<HeroInterface[]> {
    const courses$ =
      this.http.get<HeroInterface[]>(this.URL);
    const response = await firstValueFrom(courses$);
    return response;
  }


  load(): void {
    // this.http.get<HeroInterface[]>(this.URL)
    //   .subscribe((d)=> {
    //     this.data = d.map(i => ({
    //       ...i,
    //       uuid: uuidv4(),
    //     }));
    //
    //     // console.error('this.data', this.data);
    //     this._data.next(this.data);
    // });
  }

  delete(uuid: string): void {
    // this.data = this.data.filter((d: HeroInterface) => d.uuid !== uuid);
    // this._data.next(this.data);
    // this.http.delete(`${this.URL}/${uuid}`)
    //   .subscribe((d)=> {
    //     // this.data = d.map(i => ({
    //     //   ...i,
    //     //   uuid: uuidv4(),
    //     // }));
    //
    //     console.error('this.data', this.data);
    //     // this._data.next(this.data);
    //   });
  }

  add(result: HeroInterface): void {
    // this.data = [
    //   {
    //     ...result,
    //     uuid: uuidv4(),
    //   },
    //   ...this.data,
    // ];
    //
    // this._data.next(this.data);
  }

  edit(result: HeroInterface): void {

    // console.error('ee', this.data, result);
    // this.data = this.data.map((d: HeroInterface) => {
    //   return d.uuid !== result.uuid ? d : result;
    // });
    //
    // this._data.next(this.data);
  }

}
