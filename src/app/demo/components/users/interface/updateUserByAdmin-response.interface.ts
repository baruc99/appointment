// Generated by https://quicktype.io

export interface UpdateUserByAdminResponse {
    message:         string;
    updatedUserData: UpdatedUserData;
}

export interface UpdatedUserData {
    fieldCount:   number;
    affectedRows: number;
    insertId:     number;
    serverStatus: number;
    warningCount: number;
    message:      string;
    protocol41:   boolean;
    changedRows:  number;
}
