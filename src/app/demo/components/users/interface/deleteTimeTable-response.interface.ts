// Generated by https://quicktype.io

export interface DeleteTimeTableResponse {
    message:               string;
    deleteTimeTableResult: DeleteTimeTableResult;
}

export interface DeleteTimeTableResult {
    fieldCount:   number;
    affectedRows: number;
    insertId:     number;
    serverStatus: number;
    warningCount: number;
    message:      string;
    protocol41:   boolean;
    changedRows:  number;
}
