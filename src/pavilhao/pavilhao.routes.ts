import { FastifyInstance } from "fastify";
import { PavilhaoController } from "./pavilhao.controller";
import { ApiError } from "../errors";

interface IdParams {
    id: number;
}

export async function pavilhaoRoutes(app: FastifyInstance) {
    const pavilhaoController = new PavilhaoController();

    app.post('/', async(req, reply) => pavilhaoController.create(req, reply));
    app.get('/', async(req, reply) => pavilhaoController.getAll(req, reply));
    app.delete('/:id', async(req, reply) => pavilhaoController.delete(req, reply));
    app.patch<{ Params: IdParams }>('/:id', async(req, reply) => {
        if (!req.params.id) { throw new ApiError(400, 'Id não informado'); }
        
        const id = Number(req.params.id);
        return pavilhaoController.update(id, req, reply);
    });
}