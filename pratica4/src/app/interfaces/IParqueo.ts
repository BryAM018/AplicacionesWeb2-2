export interface IParqueos{
    sum: number;
    parqueos: IParqueo[];
}

export interface IParqueo {
    _id?:     string;
    entrada:    Date;
    salida:    Date;
    espacio:  string;
    vehiculo: string;
}