import { validateResult } from './../helpers/validateHelper';
import { check } from "express-validator";


export const validateCreatePaciente = [
    check('numeroIdentificacion')
    .exists().withMessage('Campo número de identificación es requerido.')
    .not()
    .isEmpty().withMessage('Campo número de identificación no puede estar vacio.')
    .bail(),
    check('codigoTipoIdentificacion')
    .exists().withMessage('El campo código de identificación es requerido.')
    .isNumeric()
    .bail(),
    check('primerNombre')
    .exists().withMessage('El campo primer nombre es requerido.')
    .not()
    .isEmpty().withMessage('El campo primer nombre no puede estar vacio.')
    .bail(),
    check('primerApellido')
    .exists().withMessage('El campo primer apellido es requerido.')
    .not()
    .isEmpty().withMessage('El campo primer apellido no puede estar vacio.')
    .bail(),
    check('email')
    .exists().withMessage('El campo email es requerido.')
    .not()
    .isEmpty().withMessage('El campo email no puede estar vacio.')
    .bail(),
    check('email')
    .isEmail().withMessage('El campo email no es válido.')
    .bail(),
    check('estado')
    .exists().withMessage('El campo estado es requerido.')
    .not()
    .isEmpty().withMessage('El campo estado no puede estar vacio.')
    .bail(),
    validateResult
]

export const validateUpdatePaciente = [
    check('email')
    .not()
    .isEmpty()
    .withMessage('El campo email es requerido.')
    .bail(),
    check('email')
    .isEmail()
    .withMessage('El campo email no es válido.')
    .bail(),
    validateResult
]