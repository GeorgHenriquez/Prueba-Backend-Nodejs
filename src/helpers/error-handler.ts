import { NextFunction, Request, Response } from "express";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error.name === 'UnauthorizedError') {
        var msg = 'Las credenciales de autenticación no son válidas.';
        if ((<any>error).code === 'invalid_signature')
            msg = 'Token no válido.';
        else if ((<any>error).code === 'credentials_required')
            msg = 'Token no fue encontrado.';
        return res.status(401).json({
            code: 401,
            success: false,
            message: msg,
            errorData: error,
        });
    }
    return res.status(500).json({
        code: 500,
        success: false,
        message: "Ha ocurrido un error inesperado.",
        errorData: error,
    });
};