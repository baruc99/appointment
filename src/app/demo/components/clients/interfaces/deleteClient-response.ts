// Generated by https://quicktype.io

export interface DeleteClienteResponse {
    message:            string;
    deleteClientResult: DeleteClientResult;
}

export interface DeleteClientResult {
    fieldCount:   number;
    affectedRows: number;
    insertId:     number;
    serverStatus: number;
    warningCount: number;
    message:      string;
    protocol41:   boolean;
    changedRows:  number;
}

