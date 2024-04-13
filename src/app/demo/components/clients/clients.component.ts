import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { trigger, transition, style, animate } from '@angular/animations';
import { ClientsService } from '../../service/clients.service';
import { Client } from './interfaces';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as custumValidators from '../shared/validators/validators';
import { LayoutService } from 'src/app/layout/service/app.layout.service';


@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
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
export class ClientsComponent {

    tieredItems: MenuItem[] = [];
    mostrarFormulario: boolean = false;


    customers1: Client[] = [];
    loading: boolean = false;
    @ViewChild('filter') filter!: ElementRef;

    clientDialog: boolean = false;
    client!: Client;


    private fb = inject(FormBuilder);

    constructor(
        public layoutService: LayoutService,
        private changeDetectorRef: ChangeDetectorRef,
        private clientsService: ClientsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }

    public addClientForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        lastname: ['', [Validators.required, Validators.minLength(3)]],
        address: [''],
        phone: ['', [Validators.required, Validators.minLength(10)]],
        email: ['', [Validators.required, Validators.minLength(4), Validators.pattern(custumValidators.emailPattern)]],
    });

    public editClientForm: FormGroup = this.fb.group({
        id: [''],
        name: ['', [Validators.required, Validators.minLength(3)]],
        lastname: ['', [Validators.required, Validators.minLength(3)]],
        address: [''],
        phone_id: ['', [Validators.required, Validators.minLength(10)]],
        email_id: ['', [Validators.required, Validators.minLength(4), Validators.pattern(custumValidators.emailPattern)]],
    })

    ngOnInit() {
        this.tieredItems = [
            {
                label: 'Agregar',
                icon: 'pi pi-fw pi-user-plus',
                command: () => this.toggleFormulario()
            }
        ];

        this.loadClients();

    }

    editClient(client: Client) {

        this.client = { ...client };
        this.clientDialog = true;

        this.editClientForm.patchValue({
            id: this.client.client_id,
            name: this.client.client_name,
            lastname: this.client.client_lastName,
            address: this.client.client_address,
            phone_id: this.client.phone_number,
            email_id: this.client.email,
        });

    }

    hideDialog() {
        this.clientDialog = false;
    }

    saveClient() {
        const { id, name, lastname, address, phone_id, email_id } = this.editClientForm.value

        let phoneNumberString: string = phone_id.toString(); // Convertir phone_id a string
        phoneNumberString = phoneNumberString.replace(/\D/g, ""); // Eliminar caracteres que no sean dígitos

        const phoneNumber: number = this.clientsService.convertirStringANumero(phoneNumberString)

        this.clientsService.updateClientServices(id, name, lastname, address, phoneNumber, email_id).subscribe({
            next: (data) => {
                this.loadClients();
                this.showInfoViaToast('Datos del cliente actualizados correctamente.');
                this.editClientForm.reset;
                this.hideDialog();
            },
            error: (msg) => {
                this.showErrorViaToast(msg)
            }
        })
    }

    deleteClient(client: Client) {

        this.confirmationService.confirm({
            message: '¿Estas seguro que quieres borrar a ' + client.client_name + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.clientsService.deleteClienteServices(client.client_id).subscribe({
                    next: (response) => {
                        this.loadClients();
                        this.showInfoViaToast('Cliente eliminado correctamente.');
                    },
                    error: (msg) => {
                        this.showErrorViaToast(msg)
                    }
                });
            }
        });
    }

    addClient() {

        const { name, lastname, address, phone, email } = this.addClientForm.value;

        let phoneNumberString: string = phone.toString(); // Convertir phone_id a string
        phoneNumberString = phoneNumberString.replace(/\D/g, ""); // Eliminar caracteres que no sean dígitos

        const phoneNumber: number = this.clientsService.convertirStringANumero(phoneNumberString)

        this.clientsService.addClientServices(name, lastname, address, phoneNumber, email).subscribe({
            next: (data) => {
                this.loadClients();
                this.showInfoViaToast('Cliente agregado correctamente');
                this.limpiarFormulario();
                this.toggleFormulario();
            },
            error: (msg) => {
                this.showErrorViaToast(msg)
            }

        });
    }

    loadClients() {
        this.clientsService.getAllClients().subscribe({
            next: (response) => {
                this.customers1 = response;
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

    toggleFormulario() {
        this.mostrarFormulario = !this.mostrarFormulario;
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    showInfoViaToast(msg) {
        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Éxito', detail: msg });
    }

    showErrorViaToast(msg) {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: msg });
    }

    limpiarFormulario() {
        this.addClientForm.reset();
    }

}
