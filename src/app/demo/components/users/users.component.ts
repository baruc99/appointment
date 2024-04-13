import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { UsersService } from '../../service/users.service';
import { animate, style, transition, trigger } from '@angular/animations';
import * as custumValidators from '../shared/validators/validators';
import { RegisterService } from '../../service/register.service';
import { timetable } from './interface';
import { Table } from 'primeng/table';
import { userByAdmin } from './interface/userAll-response.interfaces';


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ConfirmationService]
})
export class UsersComponent {

    tieredItems: MenuItem[] = [];

    mostrarFormulario: boolean = false;
    showFormTimeTable: boolean = false;
    loadingTimeTable: boolean = false;
    loadingUsers: boolean = false;
    timeTableDialog: boolean = false;
    UserDialog: boolean = false;
    timeTable!: timetable;
    userByAdmin!: userByAdmin;

    @ViewChild('filter') filter!: ElementRef;

    timeTableData: timetable[] = [];
    userData: userByAdmin[] = [];

    dropdownItems = [];
    dropdownItemsTimeTable = [];

    private fb = inject(FormBuilder);

    public addUserForm: FormGroup = this.fb.group({
        user_name: [``, [Validators.required, Validators.minLength(3)]],
        user_lastName: [``, [Validators.required, Validators.minLength(4)]],
        nickname: [``, [Validators.required, Validators.minLength(4)]],
        phone_id: [``, [Validators.required, Validators.minLength(4)]],
        email: [``, [Validators.required, Validators.minLength(4), Validators.pattern(custumValidators.emailPattern)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        id_timetable: ['', [Validators.required]],
        roles_id: ['', [Validators.required]]
    });

    public editUserForm: FormGroup = this.fb.group({
        id: [''],
        user_name: [``, [Validators.required, Validators.minLength(3)]],
        user_lastName: [``, [Validators.required, Validators.minLength(4)]],
        nickname: [``, [Validators.required, Validators.minLength(4)]],
        phone_id: [``, [Validators.required, Validators.minLength(4)]],
        email: [``, [Validators.required, Validators.minLength(4), Validators.pattern(custumValidators.emailPattern)]],
        password: ['', [Validators.minLength(8)]],
        id_timetable: ['', [Validators.required]],
        roles_id: ['', [Validators.required]]
    });

    public addTimeTableForm: FormGroup = this.fb.group({
        description: ['', [Validators.required, Validators.minLength(3)]],
        lunesEntrada: [''],
        lunesSalida: [''],
        martesEntrada: [''],
        martesSalida: [''],
        miercolesEntrada: [''],
        miercolesSalida: [''],
        juevesEntrada: [''],
        juevesSalida: [''],
        viernesEntrada: [''],
        viernesSalida: [''],
        sabadoEntrada: [''],
        sabadoSalida: [''],
        domingoEntrada: [''],
        domingoSalida: [''],
    });

    public editTimeTableForm: FormGroup = this.fb.group({
        id: [''],
        description: ['', [Validators.required, Validators.minLength(3)]],
        lunesEntrada: [''],
        lunesSalida: [''],
        martesEntrada: [''],
        martesSalida: [''],
        miercolesEntrada: [''],
        miercolesSalida: [''],
        juevesEntrada: [''],
        juevesSalida: [''],
        viernesEntrada: [''],
        viernesSalida: [''],
        sabadoEntrada: [''],
        sabadoSalida: [''],
        domingoEntrada: [''],
        domingoSalida: [''],
    });

    constructor(
        private usersService: UsersService,
        private registerService: RegisterService,
        private messageService: MessageService,
        private changeDetectorRef: ChangeDetectorRef,
        private confirmationService: ConfirmationService
    ) {

    }

    ngOnInit() {
        this.tieredItems = [
            {
                label: 'Usuario',
                icon: 'pi pi-fw pi-user-plus',
                command: () => this.toggleFormulario()
            },
            {
                label: 'Horario',
                icon: 'pi pi-fw pi-calendar-plus',
                command: () => this.toggleTimeTable()
            }
        ];

        this.loadTimeTables()
        this.loadUsers();
        this.getAllRolles();

    }


    toggleFormulario() {
        this.mostrarFormulario = !this.mostrarFormulario;
    }

    toggleTimeTable() {
        this.showFormTimeTable = !this.showFormTimeTable
    }

    // agregar usuarios

    getAllRolles() {
        this.usersService.getAllRoles().subscribe({
            next: (data) => {
                const filteredRoles = data.filter(role => role.roles_id !== 6 && role.roles_id !== 1);
                this.dropdownItems = filteredRoles;
            },
            error: (msg) => {
                console.log(msg);

            }
        });
    }

    addUser() {

        const { email, id_timetable, nickname, password, phone_id, roles_id, user_lastName, user_name } = this.addUserForm.value


        let phoneNumberString: string = phone_id.toString(); // Convertir phone_id a string
        phoneNumberString = phoneNumberString.replace(/\D/g, ""); // Eliminar caracteres que no sean dígitos

        const phoneNumber: number = this.usersService.convertirStringANumero(phoneNumberString)
        // const idTimeTable: number = this.usersService.convertirStringANumero(id_timetable)
        const idRoles: number = roles_id.roles_id
        const idTimetable: number = id_timetable.id

        this.usersService.addUser(email, nickname, password, phoneNumber, user_lastName, user_name, idTimetable, idRoles)
            .subscribe({
                next: () => {
                    this.showInfoViaToast('Usuario creado correctamente.')
                    this.addUserForm.reset;
                    this.toggleFormulario();
                    this.loadUsers();
                },
                error: (msg) => {
                    this.showErrorViaToast(msg)
                }

            });

    }

    loadUsers() {
        this.usersService.getAllUsersbyadmin().subscribe({
            next: (response) => {
                this.userData = response;
                this.loadingUsers = false;
                this.changeDetectorRef.markForCheck();
            },
            error: (error) => {
                this.loadingUsers = false;
                this.changeDetectorRef.markForCheck();
            }
        })
    }

    deleteUser(userByAdmin: userByAdmin) {

        this.confirmationService.confirm({
            message: '¿Estas seguro que quieres borrar a ' + userByAdmin.user_lastName + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usersService.deleteUserByAdmin(userByAdmin.user_id).subscribe({
                    next: (response) => {
                        this.loadUsers()
                        this.showInfoViaToast('usuario eliminado correctamente.');
                    },
                    error: (msg) => {
                        this.showErrorViaToast(msg)
                    }
                });
            }
        });
    }

    editUser(userByAdmin: userByAdmin) {
        this.userByAdmin = { ...userByAdmin }
        this.UserDialog = true;

        const roles = {
            roles_id: this.userByAdmin.roles_id,
            roles_name: this.userByAdmin.roles_name
        };

        const timeTable = {
            id: this.userByAdmin.id_timetable,
            description_timetable: this.userByAdmin.description_timetable
        }

        this.editUserForm.patchValue({
            id: this.userByAdmin.user_id,
            user_name: this.userByAdmin.user_name,
            user_lastName: this.userByAdmin.user_lastName,
            nickname: this.userByAdmin.nickname,
            phone_id: this.userByAdmin.phone_number,
            email: this.userByAdmin.email,
            id_timetable: timeTable,
            roles_id: roles,
        })
    }

    hideDialogUsers() {
        this.UserDialog = false;
    }

    saveUserByAdmin() {
        const { id, user_name, user_lastName, nickname, phone_id, email, password, id_timetable, roles_id } = this.editUserForm.value

        let phoneNumberString: string = phone_id.toString(); // Convertir phone_id a string
        phoneNumberString = phoneNumberString.replace(/\D/g, ""); // Eliminar caracteres que no sean dígitos

        const phoneNumber: number = this.usersService.convertirStringANumero(phoneNumberString)
        // const idTimeTable: number = this.usersService.convertirStringANumero(id_timetable)
        const idRoles: number = roles_id.roles_id
        const idTimetable: number = id_timetable.id

        this.usersService.updateUserByAdmin(id,user_name,user_lastName, nickname, phoneNumber, email, password, idTimetable, idRoles)
        .subscribe({
            next: () => {
                this.showInfoViaToast('Usuario actualizado correctamente.')
                this.editUserForm.reset;
                this.hideDialogUsers();
                this.loadUsers();
            },
            error: (msg) => {
                this.showErrorViaToast(msg)
            }

        });

    }




    // horarios

    deleteTimeTable(timetable: timetable) {
        this.confirmationService.confirm({
            message: '¿Estas seguro que quieres borrar a ' + timetable.description_timetable + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usersService.deleteTimeTableServices(timetable.id_timetable).subscribe({
                    next: (response) => {
                        this.loadTimeTables();
                        this.showInfoViaToast('Servicio eliminado correctamente.');
                    },
                    error: (msg) => {
                        this.showErrorViaToast(msg)
                    }
                });
            }
        });
    }

    editTimeTable(timetable: timetable) {
        this.timeTable = { ...timetable }
        this.timeTableDialog = true;

        this.editTimeTableForm.patchValue({
            id: this.timeTable.id_timetable,
            description: this.timeTable.description_timetable,
            lunesEntrada: this.usersService.parseTimeStringToTimeDate(this.timeTable.monday_start),
            lunesSalida: this.usersService.parseTimeStringToTimeDate(this.timeTable.monday_end),
            martesEntrada: this.usersService.parseTimeStringToTimeDate(this.timeTable.tuesday_start),
            martesSalida: this.usersService.parseTimeStringToTimeDate(this.timeTable.tuesday_end),
            miercolesEntrada: this.usersService.parseTimeStringToTimeDate(this.timeTable.wednesday_start),
            miercolesSalida: this.usersService.parseTimeStringToTimeDate(this.timeTable.wednesday_end),
            juevesEntrada: this.usersService.parseTimeStringToTimeDate(this.timeTable.thursday_start),
            juevesSalida: this.usersService.parseTimeStringToTimeDate(this.timeTable.thursday_end),
            viernesEntrada: this.usersService.parseTimeStringToTimeDate(this.timeTable.friday_start),
            viernesSalida: this.usersService.parseTimeStringToTimeDate(this.timeTable.friday_end),
            sabadoEntrada: this.usersService.parseTimeStringToTimeDate(this.timeTable.saturday_start),
            sabadoSalida: this.usersService.parseTimeStringToTimeDate(this.timeTable.saturday_end),
            domingoEntrada: this.usersService.parseTimeStringToTimeDate(this.timeTable.sunday_start),
            domingoSalida: this.usersService.parseTimeStringToTimeDate(this.timeTable.sunday_end),
        })
    }

    hideDialogTimeTable() {
        this.timeTableDialog = false;
    }

    saveTimeTable() {

        const {
            id,
            description,
            lunesEntrada,
            lunesSalida,
            martesEntrada,
            martesSalida,
            miercolesEntrada,
            miercolesSalida,
            juevesEntrada,
            juevesSalida,
            viernesEntrada,
            viernesSalida,
            sabadoEntrada,
            sabadoSalida,
            domingoEntrada,
            domingoSalida,
        } = this.editTimeTableForm.value


        const lunesEntradaFormat = this.usersService.extractHourAndMinute(lunesEntrada)
        const lunesSalidaFormat = this.usersService.extractHourAndMinute(lunesSalida)
        const martesEntradaFormat = this.usersService.extractHourAndMinute(martesEntrada)
        const martesSalidaFormat = this.usersService.extractHourAndMinute(martesSalida)
        const miercolesEntradaFormat = this.usersService.extractHourAndMinute(miercolesEntrada)
        const miercolesSalidaFormat = this.usersService.extractHourAndMinute(miercolesSalida)
        const juevesEntradaFormat = this.usersService.extractHourAndMinute(juevesEntrada)
        const juevesSalidaFormat = this.usersService.extractHourAndMinute(juevesSalida)
        const viernesEntradaFormat = this.usersService.extractHourAndMinute(viernesEntrada)
        const viernesSalidaFormat = this.usersService.extractHourAndMinute(viernesSalida)
        const sabadoEntradaFormat = this.usersService.extractHourAndMinute(sabadoEntrada)
        const sabadoSalidaFormat = this.usersService.extractHourAndMinute(sabadoSalida)
        const domingoEntradaFormat = this.usersService.extractHourAndMinute(domingoEntrada)
        const domingoSalidaFormat = this.usersService.extractHourAndMinute(domingoSalida)


        this.usersService.updateTimeTableServices(
            id,
            description,
            lunesEntradaFormat,
            lunesSalidaFormat,
            martesEntradaFormat,
            martesSalidaFormat,
            miercolesEntradaFormat,
            miercolesSalidaFormat,
            juevesEntradaFormat,
            juevesSalidaFormat,
            viernesEntradaFormat,
            viernesSalidaFormat,
            sabadoEntradaFormat,
            sabadoSalidaFormat,
            domingoEntradaFormat,
            domingoSalidaFormat,
        ).subscribe({
            next: (data) => {
                this.showInfoViaToast('Datos del horario actualizados correctamente.');
                this.editTimeTableForm.reset;
                this.hideDialogTimeTable();
                this.loadTimeTables();
            },
            error: (msg) => {
                this.showErrorViaToast(msg)
            }
        })
    }

    loadTimeTables() {
        this.usersService.getAllTimeTables().subscribe({
            next: (response) => {

                const datatieredItemsTimeTable = response.map(item => ({
                    id: item.id_timetable,
                    description_timetable: item.description_timetable
                }));

                this.dropdownItemsTimeTable = datatieredItemsTimeTable





                this.timeTableData = response;
                this.loadingTimeTable = false;
                this.changeDetectorRef.markForCheck();
            },
            error: (error) => {
                this.loadingTimeTable = false;
                this.changeDetectorRef.markForCheck();
            }
        })
    }

    addTimeTable() {
        const {
            description,
            lunesEntrada,
            lunesSalida,
            martesEntrada,
            martesSalida,
            miercolesEntrada,
            miercolesSalida,
            juevesEntrada,
            juevesSalida,
            viernesEntrada,
            viernesSalida,
            sabadoEntrada,
            sabadoSalida,
            domingoEntrada,
            domingoSalida,
        } = this.addTimeTableForm.value

        this.usersService.addTimeTable(
            description,
            lunesEntrada,
            lunesSalida,
            martesEntrada,
            martesSalida,
            miercolesEntrada,
            miercolesSalida,
            juevesEntrada,
            juevesSalida,
            viernesEntrada,
            viernesSalida,
            sabadoEntrada,
            sabadoSalida,
            domingoEntrada,
            domingoSalida,
        ).subscribe({
            next: (data) => {
                this.showInfoViaToast('Horario Creado correctamente.');
                this.addTimeTableForm.reset;
                this.toggleTimeTable();
                this.loadTimeTables();
            },
            error: (msg) => {
                this.showErrorViaToast(msg)
            }
        })


    }

    //? funciones generales
    showInfoViaToast(msg) {
        this.messageService.add({ key: 'tst', severity: 'success', summary: 'Éxito', detail: msg });
    }

    showErrorViaToast(msg) {
        this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: msg });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
