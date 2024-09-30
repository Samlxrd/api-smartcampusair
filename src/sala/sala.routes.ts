import { FastifyInstance, FastifyRequest } from "fastify";
import { SalaController } from "./sala.controller";

interface IdParams {
    id: number;
}

export async function salaRoutes(app: FastifyInstance) {
    const salaController = new SalaController();

    app.post('/', async(req, reply) => salaController.create(req, reply));
    app.get('/', async(req, reply) => salaController.getAll(req, reply));
    app.delete('/:id', async(req, reply) => salaController.delete(req, reply));     
    app.patch<{ Params: IdParams }> ('/:id', async(req, reply) => {

        if (!req.params.id) { throw new Error('Id não informado'); }

        const id = Number(req.params.id);
        return salaController.update(id, req, reply);
    });
}