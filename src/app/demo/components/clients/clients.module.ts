import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
// menu
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
// tabla
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedModule } from '../shared/shared.module';



@NgModule({
    imports: [
        CommonModule,
        ClientsRoutingModule,
        // menu
        MenubarModule,
        InputTextModule,
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
    declarations: [ClientsComponent],

})
export class ClientsModule { }
