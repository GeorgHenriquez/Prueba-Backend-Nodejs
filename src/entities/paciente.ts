import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { TipoIdentificacion } from './tipoIdentificacion';

@Entity({ name: 'MGM_PACIENTES' })
export class Paciente {
    @PrimaryGeneratedColumn({ name: "ID_PACIENTE" })
    idPaciente: number;

    @ManyToOne(() => TipoIdentificacion)
    @JoinColumn({ name: "CODIGO_TIPO_IDENTIFICACION" })
    codigoTipoIdentificacion: TipoIdentificacion

    @Column({ name: "NUMERO_IDENTIFICACION" })
    numeroIdentificacion: string;

    @Column({ name: "PRIMER_NOMBRE" })
    primerNombre: string;

    @Column({ name: "SEGUNDO_NOMBRE", default: null })
    segundoNombre: string;

    @Column({ name: "PRIMER_APELLIDO" })
    primerApellido: string;

    @Column({ name: "SEGUNDO_APELLIDO", default: null })
    segundoApellido: string;

    @Column({ name: "NOMBRE_COMPLETO" })
    nombreCompleto: string;

    @Column({ name: "EMAIL" })
    email: string;
    
    @Column({ name: "ESTADO" })
    estado: string;

    @Column({ name: "FECHA_INGRESO", type: "timestamp" })
    fechaIngreso: Date;

    @Column({ name: "USUARIO_INGRESO" })
    usuarioIngreso: string;

    @Column({ name: "FECHA_MODIFICACION", type: "timestamp", default: null })
    fechaModificacion: Date;

    @Column({ name: "USUARIO_MODIFICACION", default: null })
    usuarioModificacion: string;

    @BeforeInsert()
    @BeforeUpdate()
    armarNombreCompleto() {
        this.nombreCompleto = this.primerNombre + " " ;
        if (this.segundoNombre)
            this.nombreCompleto += this.segundoNombre + " ";
        this.nombreCompleto += this.primerApellido + " ";
        if (this.segundoApellido)
            this.nombreCompleto += this.segundoApellido
    }
}