import { FastifyReply, FastifyRequest } from "fastify";
import { SalaUsecase } from "./sala.usecase";
import { createSalaSchema, updateModoAutomaticoSchema, updateSalaSchema, UpdateSalaSchema, UpdateStatusSalaSchema, updateStatusSalaSchema } from "./sala.schema";
import { ApiError } from "../errors";

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
        const salaData = updateSalaSchema.parse(req.body) as UpdateSalaSchema;
        const result = await this.salaUseCase.update(id, salaData);
        return reply.send(result);
    }

    async updateStatus(id: number, req: FastifyRequest, reply: FastifyReply) {
        const salaData = updateStatusSalaSchema.parse(req.body) as UpdateStatusSalaSchema;
        const result = await this.salaUseCase.updateStatus(id, salaData);
        return reply.send(result);
    }

    async updateMode(id: number, req: FastifyRequest, reply: FastifyReply) {
        const modoData = updateModoAutomaticoSchema.parse(req.body);
        const result = await this.salaUseCase.updateMode(id, modoData);
        return reply.send(result);
    }

    async delete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: number}

        if (!id) { throw new ApiError(400, 'Você deve informar o id da sala. => /:id') }

        await this.salaUseCase.delete(Number(id));
        return reply.send({ message: 'Sala deletada com sucesso' });
    }
}