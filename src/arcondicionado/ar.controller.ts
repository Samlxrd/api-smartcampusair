import { FastifyReply, FastifyRequest } from "fastify";
import { ArCondicionadoUseCase } from "./ar.usecase";
import { createArCondicionadoSchema } from "./ar.schema";
import { ApiError } from "../errors";

export class ArCondicionadoController {
    private arCondicionadoUseCase: ArCondicionadoUseCase;
    constructor() {
        this.arCondicionadoUseCase = new ArCondicionadoUseCase();
    }

    async create(req: FastifyRequest, reply: FastifyReply) {
        const arData = createArCondicionadoSchema.parse(req.body);
        const result = await this.arCondicionadoUseCase.create(arData);
        return reply.code(201).send(result);
    }

    async get(id: number, req: FastifyRequest, reply: FastifyReply) {
        const result = await this.arCondicionadoUseCase.get(id);
        return reply.send(result);
    }

    async delete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: number}

        if (!id) { throw new ApiError(400, 'Você deve informar o id do ar-condicionado. => /:id') }

        await this.arCondicionadoUseCase.delete(Number(id));
        return reply.status(204).send({ message: 'Ar-condicionado deletado com sucesso.' });
    }
}