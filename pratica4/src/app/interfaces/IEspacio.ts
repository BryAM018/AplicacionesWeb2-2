export interface IEspacios {
    sum: number;
    espacios: IEspacio[];
}

export interface IEspacio {

    _id?:     string;
    descripcion:    string;

}
export interface espacioEditando{
    _id?:     string;
    descripcion:    string;
}