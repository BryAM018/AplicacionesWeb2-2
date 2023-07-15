export interface IVehiculos {
    sum: number;
    vehiculos: IVehiculo[];
}

export interface IVehiculo {
    _id?:     string;
    descripcion:    string;
    placa:    string;
    color:   EXT_sRGB;
}