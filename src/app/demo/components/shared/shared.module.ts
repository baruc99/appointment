import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CapitalizePipe } from '../pipes/Capitalize.pipe';



@NgModule({
  declarations: [
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    RouterModule,

  ],
  exports: [
    CapitalizePipe
  ]
})
export class SharedModule { }
