export interface IParqueos{
    sum: number;
    parqueos: IParqueo[];
}

export interface IParqueo {
    _id?:     string;
    entrada:    string;
    salida:    string;
    espacio:   string;
    vehiculo: string;
}