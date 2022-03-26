import jwt from "express-jwt";

export const authJwt = jwt({
    secret: 'secret',
    algorithms: ['HS256']
}).unless({
    path: [
        '/api/v1/autenticacion/login'
    ]
});