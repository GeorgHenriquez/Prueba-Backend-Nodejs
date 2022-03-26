import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'DAF_TIPOS_IDENTIFICACION' })
export class TipoIdentificacion {
    @PrimaryGeneratedColumn({ name: "CODIGO_TIPO_IDENTIFICACION" })
    codigoTipoIdentificacion: number;

    @Column({ name: "NOMBRE_TIPO_IDENTIFICACION" })
    nombreTipoIdentificacion: string;

    @Column({ name: "ESTADO" })
    estado: string;

}