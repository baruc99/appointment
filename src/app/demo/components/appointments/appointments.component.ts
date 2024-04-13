import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-appointments',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './appointments.component.html',
    styleUrl: './appointments.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsComponent { }
