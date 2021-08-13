export interface IWrite {
    save:(data: [] )=> Promise<any>;
    insertCategory:(data: [] )=> Promise<any>;
    insertProduct:(data: any, id: string )=> Promise<any>;
}