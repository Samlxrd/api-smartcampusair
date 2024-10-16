import { FastifyInstance } from "fastify";
import { UsuarioController } from "./usuario.controller";

interface IdParams {
    id: number;
}

export async function usuarioRoutes(app: FastifyInstance) {
    const usuarioController = new UsuarioController();
    
    app.post('/', async(req, reply) => usuarioController.create(req, reply));
}