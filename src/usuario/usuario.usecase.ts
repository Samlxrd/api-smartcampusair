import { ApiError } from "../errors";
import { hashPassword } from "../utils/hashUtils";
import { UsuarioRepository } from "./usuario.interface";
import { UsuarioRepositoryPrisma } from "./usuario.repository";
import { CreateUsuarioSchema } from "./usuario.schema";

export class UsuarioUsecase {
    private usuarioRepository: UsuarioRepository;
    constructor() {
        this.usuarioRepository = new UsuarioRepositoryPrisma();
    }

    async create(usuarioData: CreateUsuarioSchema) {
        const  usuarioExists = await this.usuarioRepository.findByMatricula(usuarioData.matricula);
        if (usuarioExists) { throw new ApiError(409, 'Esse usuário já está registrado no sistema.'); }

        const hashedPassword = await hashPassword(usuarioData.senha);
        usuarioData.senha = hashedPassword;

        const result = this.usuarioRepository.create(usuarioData);
        return result;
    }

    async findByMatricula(matricula: number) {
        const result = this.usuarioRepository.findByMatricula(matricula);
        return result;
    }

    async findById(id: number) {
        const result = this.usuarioRepository.findById(id);
        return result;
    }

    async getAll() {
        const result = this.usuarioRepository.getAll();
        return result;
    }

    async update(id: number, usuarioData: CreateUsuarioSchema) {
        const result = this.usuarioRepository.update(id, usuarioData);
        return result;
    }
}