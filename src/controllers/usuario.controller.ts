import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { sign } from "jsonwebtoken";

import { Usuario } from '../entities/usuario';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuario = await getRepository(Usuario).findOne({
            where: { username: req.body.username }
        });
        if (usuario && usuario.userPassword === req.body.password){
            const token = sign(
                { username: usuario.username },
                'secret'
            );
            res.status(200).json({
                code: 200,
                success: true,
                message: "Usuario Autenticado.",
                username: usuario.username,
                token: token
            });
        } else {
            return res.status(401).json({
                code: 401,
                success: false,
                message: "Las credenciales de autenticación no son válidas.",
                errorData: [],
            });
        }
    } catch (err) {
        next(err);
    }
    
}