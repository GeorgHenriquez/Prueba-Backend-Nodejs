import 'reflect-metadata';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { authJwt } from './helpers/jwt';
import { errorHandler } from './helpers/error-handler';
import { createConnection } from 'typeorm';

import pacientesRoutes from './routes/paciente.routes';
import usuarioRoutes from './routes/usuario.routes';

const app = express();
createConnection();

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(authJwt)
app.use(errorHandler)

// Routes
const api = '/api/v1'
app.use(`${api}/pacientes`, pacientesRoutes);
app.use(`${api}/autenticacion`, usuarioRoutes);

app.listen(3000, () => {
  console.log('Server listening on port', 3000)
});