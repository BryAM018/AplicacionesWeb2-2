import { IEspacio } from "./IEspacio";
import { IVehiculo } from "./IVehiculo";

export interface IParqueos{
    sum: number;
    parqueos: IParqueo[];
}

export interface IParqueo {
    _id?:     string;
    entrada:    string;
    salida:    string;
    espacio:  IEspacio["_id"];
    vehiculo: IVehiculo["_id"];
}