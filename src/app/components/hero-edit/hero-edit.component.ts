import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { HeroService } from '../../services/hero.service';
import { HeroInterface } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss'],
  imports: [
    MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule,
    FormsModule, ReactiveFormsModule,
  ],
  providers: [
    HeroService,
  ]
})
export class HeroEditComponent {
  form!: UntypedFormGroup;

  readonly heroService = inject(HeroService);
  readonly fb = inject(UntypedFormBuilder);

  dialogRef = inject(MatDialogRef);
  data: HeroInterface = inject(MAT_DIALOG_DATA);

  constructor(
  ) {

    this.form = this.fb.group({
      uuid: [this.data.uuid ?? null],
      nameLabel: [this.data.nameLabel ?? '', [Validators.required]],
      genderLabel: [this.data.genderLabel ?? '', [Validators.required]],
      citizenshipLabel: [this.data.citizenshipLabel ?? '', [Validators.required]],
      skillsLabel: [this.data.skillsLabel ?? '', [Validators.required]],
      occupationLabel: [this.data.occupationLabel ?? '', [Validators.required]],
      memberOfLabel: [this.data.memberOfLabel ?? '', [Validators.required]],
      creatorLabel: [this.data.creatorLabel ?? '', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if(this.form.valid){
      if(this.data.uuid) {
        this.heroService.edit(this.form.value);
      } else {
        this.heroService.add(this.form.value);
      }

      this.dialogRef.close(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }

  }
}
