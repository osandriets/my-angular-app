import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { HeroInterface } from '../../interfaces/hero.interface';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatButton
  ],
})
export class AlertComponent {

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HeroInterface,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(data: HeroInterface): void {
    this.dialogRef.close(data);
  }
}
