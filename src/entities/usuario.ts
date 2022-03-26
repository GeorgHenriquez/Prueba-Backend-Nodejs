import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'USUARIOS' })
export class Usuario {
    @PrimaryGeneratedColumn({ name: "CODIGO_USUARIO" })
    codigoUsuario: number;

    @Column({ name: "USERNAME" })
    username: string;

    @Column({ name: "USER_PASSWORD" })
    userPassword: string;

}