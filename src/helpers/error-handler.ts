import { NextFunction, Request, Response } from "express";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error.name === 'UnauthorizedError') {
        return res.status(401).json({
            code: 401,
            success: false,
            message: "Las credenciales de autenticación no son válidas.",
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