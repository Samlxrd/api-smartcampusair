import { FastifyReply, FastifyRequest } from "fastify";
import { PavilhaoUsecase } from "./pavilhao.usecase";
import { PavilhaoSchema, pavilhaoSchema } from "./pavilhao.schema";
import { ApiError } from "../errors";

export class PavilhaoController {
    private pavilhaoUseCase: PavilhaoUsecase;
    constructor() {
        this.pavilhaoUseCase = new PavilhaoUsecase();
    }

    async create(req: FastifyRequest, reply: FastifyReply) {
        const pavilhaoData = pavilhaoSchema.parse(req.body);
        const result = await this.pavilhaoUseCase.create(pavilhaoData);
        return reply.code(201).send(result);
    }

    async getAll(req: FastifyRequest, reply: FastifyReply) {
        const result = await this.pavilhaoUseCase.getAll();
        return reply.send(result);
    }

    async update(id: number, req: FastifyRequest, reply: FastifyReply) {
        const pavilhaoData = pavilhaoSchema.parse(req.body);
        const result = await this.pavilhaoUseCase.update(id, pavilhaoData);
        return reply.send(result);
    }

    async delete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: number}

        if (!id) { throw new ApiError(400, 'Você deve informar o id do pavilhão. => /:id') }

        await this.pavilhaoUseCase.delete(Number(id));
        return reply.send({ message: 'Pavilhão deletado com sucesso' });
    }
}