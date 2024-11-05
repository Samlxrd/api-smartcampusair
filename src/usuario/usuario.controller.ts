import { FastifyReply, FastifyRequest } from "fastify";
import { createUsuarioSchema } from "./usuario.schema";
import { UsuarioUsecase } from "./usuario.usecase";

export class UsuarioController {
    private usuarioUseCase: UsuarioUsecase;
    constructor() {
        this.usuarioUseCase = new UsuarioUsecase();
    }

    async create(req: FastifyRequest, reply: FastifyReply) {
        const usuarioData = createUsuarioSchema.parse(req.body);
        const result = await this.usuarioUseCase.create(usuarioData);
        return reply.code(201).send(result);
    }
}