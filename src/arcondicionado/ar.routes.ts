import { FastifyInstance } from "fastify";
import { ArCondicionadoController } from "./ar.controller";
import { ApiError } from "../errors";

interface IdParams {
    id: number;
}

export async function arCondicionadoRoutes(app: FastifyInstance) {
    const arCondicionadoController = new ArCondicionadoController();

    app.post('/', async(req, reply) => arCondicionadoController.create(req, reply));
    app.delete('/:id', async(req, reply) => arCondicionadoController.delete(req, reply));
    app.get<{ Params: IdParams}>('/:id', async(req, reply) =>  {
        if (!req.params.id) { throw new ApiError(400, 'Você deve informar o id da sala. => /:id') }
        const id = Number(req.params.id)
        return arCondicionadoController.get(id, req, reply);
    });
}


// import { FastifyInstance, FastifyRequest } from "fastify";
// import { SalaController } from "./sala.controller";



// export async function salaRoutes(app: FastifyInstance) {
//     const salaController = new SalaController();

//     app.post('/', async(req, reply) => salaController.create(req, reply));
//     app.get('/', async(req, reply) => salaController.getAll(req, reply));
//     app.delete('/:id', async(req, reply) => salaController.delete(req, reply));     
//     app.patch<{Params: IdParams }> ('/:id', async(req, reply) => {

//         if (!req.params.id) { throw new Error('Id não informado'); }

//         const id = Number(req.params.id);
//         return salaController.update(id, req, reply);
//     });
// }