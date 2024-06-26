export interface userByAdmin {
    user_id:               number;
    roles_id:              number;
    phone_id:              number;
    email_id:              number;
    id_timetable:          number;
    isActive:              number;
    user_lastName:         string;
    user_name:             string;
    password:              string;
    token:                 string;
    user_creation_date:    string;
    nickname:              string;
    parentUser:            number;
    roles_name:            string;
    email:                 string;
    phone_number:          number;
    description_timetable: string;
    monday_start:          string;
    monday_end:            string;
    tuesday_start:         string;
    tuesday_end:           string;
    wednesday_start:       string;
    wednesday_end:         string;
    thursday_start:        string;
    thursday_end:          string;
    friday_start:          string;
    friday_end:            string;
    saturday_start:        string;
    saturday_end:          string;
    sunday_start:          string;
    sunday_end:            string;
    of:                    number | null;
}
