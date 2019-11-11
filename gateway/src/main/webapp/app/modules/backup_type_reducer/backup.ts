import { AxiosPromise } from 'axios';
export interface IPayload<T> {
    type: string;
    payload: AxiosPromise<T>;
    meta?: any;
}
export declare type IPayloadResult<T> = ((dispatch: any) => IPayload<T> | Promise<IPayload<T>>);
export declare type ICrudGetAction<T> = (id: string | number) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudGetSomeAction1<T> = (id?: string | number, etc?: string | number) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudGetSomeAction3Params<T> = (id?: string | number, etc?: string | number, etc3?: string | number) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudGetSomeAction4Params<T> = (id?: string | number, etc?: string | number, etc3?: string | number, etc4?: number | string) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudGetSomeAction2Params<T> = (id?: string | number, etc?: string | number) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudGetAllAction<T> = (page?: number, size?: number, sort?: string) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudSearchAction<T> = (search?: string, page?: number, size?: number, sort?: string) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudPutAction<T> = (data?: T) => IPayload<T> | IPayloadResult<T>;
export declare type ICrudPutAction2Params<T> = (data?: T, etc1?: string | number) => IPayload<T> | IPayloadResult<T>;
export declare type ICrudDeleteAction<T> = (id?: string | number) => IPayload<T> | IPayloadResult<T>;
export declare type IXoaVaTraVeDanhSach2Params<T> = (etc1?: string | number, etc2?: string | number) => IPayload<T> | IPayloadResult<T>;
export declare type IXoaVaTraVeDanhSach3Params<T> = (etc1?: string | number, etc2?: string | number, etc3?: string | number) => IPayload<T> | IPayloadResult<T>;
export declare type IXoaVaTraVeDanhSach4Params<T> = (etc1?: string | number, etc2?: string | number, etc3?: string | number, etc4?: string | number) => IPayload<T> | IPayloadResult<T>;
