import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateResult = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorList = errors.array();
        return res.status(400).json({
            code: 400,
            success: false,
            message: `${errorList[0]['msg']}`,
            errorData: [],
        });
    }
    next();
};