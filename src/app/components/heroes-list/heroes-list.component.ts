import { Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { MatIconModule } from '@angular/material/icon';
import { AlertComponent } from '../alert/alert.component';
import { HeroEditComponent } from '../hero-edit/hero-edit.component';
import { HeroService } from '../../services/hero.service';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { HeroInterface } from '../../interfaces/hero.interface';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { KpiComponent } from '../kpi/kpi.component';
import { ChartComponent } from '../chart/chart.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
  imports: [
    MatTableModule, MatSortModule, MatChipsModule, MatButtonModule, MatIconModule,
    NgIf, MatInputModule, HeroSearchComponent, KpiComponent, ChartComponent,
  ],
  providers: [
    HeroService,
  ]
})
export class HeroesListComponent implements OnInit{

  heroes = signal<HeroInterface[]>([]);
  sort = signal<any>({ active: 'nameLabel', direction: 'asc' });
  search = signal<string[]>([]);

  displayedColumns: string[] = [
    'nameLabel', 'genderLabel', 'citizenshipLabel', 'skillsLabel',
    'occupationLabel', 'memberOfLabel', 'creatorLabel', 'actions'];
  displayedColumnsChart: string[] = [
    'nameLabelChart', 'genderLabelChart', 'citizenshipLabelChart', 'skillsLabelChart',
    'occupationLabelChart', 'memberOfLabelChart', 'creatorLabelChart', 'actionsChart'];

  matSortActive = 'nameLabel';
  matSortDirection: SortDirection = 'asc';

  filteredHeroes = computed(() => {
    const heroes = this.heroes();
    const sort = this.sort();
    const search = this.search();
    return heroes
      .filter(d => !search.length || search.includes(d.nameLabel))
      .sort((a: any, b: any) => {
        return sort.direction === 'asc'
          ? a[sort.active].localeCompare(b[sort.active])
          : b[sort.active].localeCompare(a[sort.active]);
      })
  });


  @ViewChild(MatTable) table!: MatTable<HeroInterface>;

  readonly heroService = inject(HeroService);
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadHeroes().then();
  }

  onSortData(sort: Sort): void {
    this.sort.set(sort);
  }

  showDetails(row: HeroInterface): void {
    this.dialog.open(HeroDetailsComponent, {
      data: row,
    });
  }

  onEdit(event: any, element = {}): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(HeroEditComponent, {
      data: element,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.heroService.delete(result.uuid);

        const heroes = this.heroes();

        if(!result.uuid) {
          this.heroes.set([
            ...heroes,
            {
              ...result,
              uuid: uuidv4(),
            }
          ]);
        } else {
          this.heroes.set([
            ...heroes.map(h => {
              if(h.uuid !== result.uuid) {
                return h;
              } else {
                return result;
              }
            })
          ]);
        }
      }
    });
  }

  onDelete(event: any, element: any): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(AlertComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // const heroes = this.heroes();
        //
        // this.heroes.set([
        //   ...heroes.filter(h => h.uuid !== result.uuid)
        // ]);

        this.onHeroDeleted(result.nameLabel).then()
      }
    });
  }

  getNames(items: HeroInterface[] | null): string[]  {
    if(!items){
      return [];
    }

    return Array.from(new Set([ ...items && items.map(i => i.nameLabel) ]))
  }

  setSearch(event: string[]): void {
    this.search.set(event);
  }

  async loadHeroes() {
    try {
      const heroes = await this.heroService.loadAllHeroes();
      this.heroes.set(heroes);
    }
    catch(err) {
      console.error(err);
    }
  }

  async onHeroDeleted(heroesLabel: string) {
    try {
      await this.heroService.deleteHero(heroesLabel);
      const heroes = this.heroes();

      const newHeroes = heroes
        .filter(h => h.nameLabel !== heroesLabel)
      this.heroes.set(newHeroes);
    }
    catch (err) {
      console.error(err)
      alert(`Error deleting hero.`)
    }
  }
}
