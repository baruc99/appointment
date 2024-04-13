import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
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
import { UsersComponent } from './users.component';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    // menu
    MenubarModule,
    InputTextModule,
    DropdownModule,
    TabViewModule,
    // formulario
    InputTextareaModule,
    InputMaskModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    ToastModule,
    CalendarModule,
    PasswordModule,
    // tabla
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    SharedModule
  ],
  providers: [MessageService],
})
export class UsersModule { }
