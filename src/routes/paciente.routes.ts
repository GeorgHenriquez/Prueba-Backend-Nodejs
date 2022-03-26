import { validateCreatePaciente, validateUpdatePaciente } from './../validators/pacienteValidator';
import { Router } from 'express';
import { getPacientes, createPaciente, getPaciente, updatePaciente, deletePaciente } from '../controllers/paciente.controller';

const router = Router();

router.get('', getPacientes);

router.post('', validateCreatePaciente, createPaciente);

router.get('/:idPaciente', getPaciente);

router.put('/:idPaciente', validateUpdatePaciente, updatePaciente);

router.delete('/:idPaciente', deletePaciente);

export default router;