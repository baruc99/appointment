import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { ServicesRoutingModule } from './services-routing.module';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ServicesRoutingModule,
         // menu
         MenubarModule,
         InputTextModule,
         InputGroupModule,
         InputGroupAddonModule,
         InputNumberModule,
         CalendarModule,
          // formulario
        InputTextareaModule,
        InputMaskModule,
        ButtonModule,
        RippleModule,
        ReactiveFormsModule,
        ToastModule,
        // tabla
        TableModule,
        DialogModule,
        ConfirmDialogModule,
        SharedModule
    ],
    providers: [MessageService],
    declarations: [ServicesComponent],
})
export class ServicesModule { }
