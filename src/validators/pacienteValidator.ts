import { validateResult } from './../helpers/validateHelper';
import { check } from "express-validator";

export const validateCreatePaciente = [
    check('numeroIdentificacion').exists().not().isEmpty(),
    check('codigoTipoIdentificacion').exists().isNumeric(),
    check('primerNombre').exists().not().isEmpty(),
    check('primerApellido').exists().not().isEmpty(),
    check('nombreCompleto').exists().not().isEmpty(),
    check('email').exists().not().isEmpty().isEmail(),
    check('estado').exists().not().isEmpty(),
    check('fechaIngreso').exists().isDate(),
    check('usuarioIngreso').exists().not().isEmpty(),
    validateResult
]

export const validateUpdatePaciente = [
    check('email').exists().not().isEmpty().isEmail(),
    validateResult
]