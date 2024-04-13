import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppointmentsComponent } from './appointments.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AppointmentsComponent }
    ])],
    exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
