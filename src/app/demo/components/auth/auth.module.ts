import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterRoutingModule } from './registro/register-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        RegisterRoutingModule,
        NgxSpinnerModule
    ]
})
export class AuthModule { }
