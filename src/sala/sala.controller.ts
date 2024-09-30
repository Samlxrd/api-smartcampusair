import { FastifyReply, FastifyRequest } from "fastify";
import { SalaUsecase } from "./sala.usecase";
import { createSalaSchema, CreateSalaSchema, UpdateSalaSchema } from "./sala.schema";

export class SalaController {
    private salaUseCase: SalaUsecase;
    constructor() {
        this.salaUseCase = new SalaUsecase();
    }

    async create(req: FastifyRequest, reply: FastifyReply) {
        const salaData = createSalaSchema.parse(req.body);
        const result = await this.salaUseCase.create(salaData);
        return reply.code(201).send(result);
    }

    async getAll(req: FastifyRequest, reply: FastifyReply) {
        const result = await this.salaUseCase.getAll();
        return reply.send(result);
    }

    async update(id: number, req: FastifyRequest, reply: FastifyReply) {
        const result = await this.salaUseCase.update(id, req.body as UpdateSalaSchema);
        return reply.send(result);
    }

    async delete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: number}
        await this.salaUseCase.delete(Number(id));
        return reply.send({ message: 'Sala deletada com sucesso' });
    }
}