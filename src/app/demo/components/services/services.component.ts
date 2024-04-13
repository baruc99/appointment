import { DeleteServiceResponse } from './interfaces/deteleService-response';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { esMayorACero } from '../shared/validators/validators';
import { ServicesService } from '../../service/services.service';
import { Service } from './interfaces/service';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrl: './services.component.css',
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-out', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('300ms ease-in', style({ opacity: 0 })),
            ]),
        ]),
    ],
    providers: [ConfirmationService]
})
export class ServicesComponent {

    tieredItems: MenuItem[] = [];
    mostrarFormulario: boolean = false;

    serviceData: Service[] = [];
    loading: boolean = false;
    @ViewChild('filter') filter!: ElementRef;

    serviceDialog: boolean = false;
    service!: Service


    private fb = inject(FormBuilder);

    constructor(
        private servicesService: ServicesService,
        private messageService: MessageService,
        private changeDetectorRef: ChangeDetectorRef,
        private confirmationService: ConfirmationService
    ) {

    }

    public addServiceForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        description: [''],
        price: ['', [Validators.required, esMayorACero]],
        approximate_time: [''],
    });

    public editServiceForm: FormGroup = this.fb.group({
        id: [''],
        name: ['', [Validators.required, Validators.minLength(3)]],
        description: [''],
        price: ['', [Validators.required, esMayorACero]],
        approximate_time: [''],
        userAdd: ['']
    });


    ngOnInit() {
        this.tieredItems = [
            {
                label: 'Agregar',
                icon: 'pi pi-fw pi-plus-circle',
                command: () => this.toggleFormulario()
            }
        ];

        this.loadServices();
    }

    addService() {

        const { name, description, price, approximate_time } = this.addServiceForm.value;


        this.servicesService.addServiceServices(name, description, price, approximate_time).subscribe({
            next: (data) => {
                this.loadServices();
                this.showInfoViaToast('Servicio agregado correctamente');
                this.limpiarFormulario();
                this.toggleFormulario();
            },
            error: (msg) => {
                this.showErrorViaToast(msg)
            }
        })
    }

    editService(service: Service) {

        this.service = { ...service }
        this.serviceDialog = true;

        const timeParts = this.service.service_approximate_time.split(':');
        const timeDate = new Date();
        timeDate.setHours(parseInt(timeParts[0], 10));
        timeDate.setMinutes(parseInt(timeParts[1], 10));
        timeDate.setSeconds(parseInt(timeParts[2], 10));
        console.log(this.service.service_approximate_time);


        this.editServiceForm.patchValue({
            id: this.service.service_id,
            name: this.service.service_name,
            description: this.service.service_description,
            price: this.service.service_price,
            approximate_time: timeDate,
            userAdd: this.service.userAdd
        })

    }

    loadServices() {
        this.servicesService.getAllServices().subscribe({
            next: (response) => {
                this.serviceData = response;
                this.loading = false;
                this.changeDetectorRef.markForCheck(); // Marcar para la detección de cambios
            },
            error: (error) => {
                // console.log(error);
                this.loading = false;
                this.changeDetectorRef.markForCheck(); // Marcar para la detección de cambios
            }
        });
    }

    hideDialog() {
        this.serviceDialog = false;
    }

    saveService() {
        const { id, name, description, price, approximate_time, userAdd } = this.editServiceForm.value
        let soloHora
        console.log(this.editServiceForm.value);


        if (typeof approximate_time === 'string') {
            const [horas, minutos] = approximate_time.split(':');
            soloHora = `${horas}:${minutos}`;
        } else {
            console.error('approximate_time is not a string.');
        }

        this.servicesService.updateClientServices(id, name, description, price, soloHora, userAdd).subscribe({
            next: (data) => {
                this.loadServices();
                this.showInfoViaToast('Datos del servicio actualizados correctamente.');
                this.editServiceForm.reset;
                this.hideDialog();
            },
            error: (msg) => {
                this.showErrorViaToast(msg)
            }
        })
    }

    deleteService(service: Service) {
        this.confirmationService.confirm({
            message: '¿Estas seguro que quieres borrar a ' + service.service_name + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.servicesService.deleteServiceServices(service.service_id).subscribe({
                    next: (response) => {
                        this.loadServices();
                        this.showInfoViaToast('Servicio eliminado correctamente.');
                    },
                    error: (msg) => {
                        this.showErrorViaToast(msg)
                    }
                });
            }
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    toggleFormulario() {
        this.mostrarFormulario = !this.mostrarFormulario;
    }

    showInfoViaToast(msg) {
        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Éxito', detail: msg });
    }

    showErrorViaToast(msg) {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: msg });
    }

    limpiarFormulario() {
        this.addServiceForm.reset();
    }

}
