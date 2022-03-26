import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { verify } from "jsonwebtoken";

import { Paciente } from '../entities/paciente';


export const getPacientes = async (req: Request, res: Response, next: NextFunction) => {
    // Paginacion
    const page: number = parseInt(req.query.page as string) || 1;
    const perPage: number = parseInt(req.query.perPage as string) || 5;

    // Filtros
    const tipoFiltro: string = req.query.tipoFiltro as string || '';
    const valorFiltro: string = req.query.valorFiltro as string || '';
    const estado: string = req.query.estado as string || 'S';

    try {
        const builder = getRepository(Paciente).createQueryBuilder('paciente')
            .leftJoinAndSelect('paciente.codigoTipoIdentificacion', 'tipoIdentificacion')
            .where('paciente.estado = :estado', { estado: estado });
    
        if (tipoFiltro != '' && valorFiltro != ''){
            builder.andWhere(`paciente.${tipoFiltro} LIKE :tipoFiltro`, { tipoFiltro: `%${valorFiltro}%` });
        }
    
        builder.skip((page - 1) * perPage).take(perPage);
        const total = await builder.getCount();
        const pacientes = await builder.getMany();
    
        return res.json({
            code: 200,
            success: true,
            message: 'OK',
            data: pacientes,
            totalRows: total,
        });
    } catch (error) {
        next(error);
    }
}


export const createPaciente = async (req: Request, res: Response, next: NextFunction) => {
    const pacienteRepository = getRepository(Paciente);
    const codigoTipoIdentificacion: number = req.body.codigoTipoIdentificacion;

    try {
        const identificacion = await pacienteRepository.findOne({
            where: { codigoTipoIdentificacion: codigoTipoIdentificacion }
        });
        if (!identificacion)
            return res.status(400).json({
                code: 400,
                success: false,
                message: "El campo no es válido.",
                // message: "No se ha encontrado el tipo de identificación.",
                errorData: []
            });
        const idPaciente = await pacienteRepository
            .createQueryBuilder("paciente")
            .select("NVL(MAX(paciente.idPaciente), 0) + 1", "id")
            .getRawOne();
        const paciente = new Paciente()
        pacienteRepository.merge(paciente, req.body);
        paciente.idPaciente = idPaciente.id

        const nuevoPaciente = getRepository(Paciente).create(paciente);
        const result = await getRepository(Paciente).save(nuevoPaciente);
        
        return res.status(200).json({
            code: 200,
            success: true,
            message: "Paciente creado.",
            data: result,
        });
    } catch (error) {
        next(error);
    }
}


export const getPaciente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getRepository(Paciente).createQueryBuilder('paciente')
            .where('paciente.idPaciente = :id', { id: req.params.idPaciente })
            .leftJoinAndSelect('paciente.codigoTipoIdentificacion', 'tipoIdentificacion')
            .getOne();
        if (result) 
            return res.status(200).json({
                code: 200,
                success: true,
                message: "OK",
                data: result,
            });
        return res.status(400).json({
            code: 400,
            success: false,
            message: "El campo no es válido.",
            errorData: []
        });
    } catch (error) {
        next(error);
    }
}


export const updatePaciente = async (req: Request, res: Response, next: NextFunction) => {
    var codigo_usuario;
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1], decoded;
        try {
            decoded = verify(authorization, 'secret');
        } catch (error) {
            next(error);
        }
        codigo_usuario = (<any>decoded).codigoUsuario;
    }   

    const numeroIdentificacion = req.body.numeroIdentificacion;
    const codigoIdentificacion = req.body.codigoTipoIdentificacion;
    if (numeroIdentificacion || codigoIdentificacion)
        return res.status(400).json({
            code: 400,
            success: false,
            message: "El campo no es válido.",
            // message: "No es posible modificar los campos de número y código de identificación.",
            errorData: []
        });
    try {
        const paciente = await getRepository(Paciente).findOne(req.params.idPaciente);
        if (paciente) {
            getRepository(Paciente).merge(paciente, req.body);
            paciente.fechaModificacion = new Date();
            paciente.usuarioModificacion = String(codigo_usuario);
            const result = await getRepository(Paciente).save(paciente);
            return res.status(200).json({
                code: 200,
                success: true,
                message: "Paciente actualizado.",
                data: result,
            });
        }
        return res.status(400).json({
            code: 400,
            success: false,
            message: "El campo no es válido.",
            errorData: []
        });

    } catch (error) {
       next(error);
    }
}

export const deletePaciente = async (req: Request, res: Response, next: NextFunction) => {
    var codigo_usuario;
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1], decoded;
        try {
            decoded = verify(authorization, 'secret');
        } catch (error) {
            next(error);
        }
        codigo_usuario = (<any>decoded).codigoUsuario;
    }

    try {
        const paciente = await getRepository(Paciente).findOne(req.params.idPaciente);
        if (paciente) {
            paciente.estado = 'N';
            paciente.fechaModificacion = new Date();
            paciente.usuarioModificacion = String(codigo_usuario);
            const result = await getRepository(Paciente).save(paciente);
            return res.status(200).json({
                code: 200,
                success: true,
                message: "Paciente eliminado.",
                data: result,
            });
        }
        return res.status(400).json({
            code: 400,
            success: false,
            message: "El campo no es válido.",
            errorData: []
        });
    } catch (error) {
        next(error);
    }
}