import { ApiError } from "../errors";
import { Pavilhao, PavilhaoRepository } from "./pavilhao.interface";
import { PavilhaoRepositoryPrisma } from "./pavilhao.repository";
import { PavilhaoSchema } from "./pavilhao.schema";

export class PavilhaoUsecase {
    private pavilhaoRepository: PavilhaoRepository;
    constructor() {
        this.pavilhaoRepository = new PavilhaoRepositoryPrisma();
    }

    async create(pavilhaoData: PavilhaoSchema) {
        const pavilhaoExists = await this.pavilhaoRepository.findByName(pavilhaoData.nome);

        if (pavilhaoExists) { throw new ApiError(409, 'Esse nome de pavilhão já está registrado no sistema.'); }

        const result = this.pavilhaoRepository.create(pavilhaoData);
        return result;
    }

    async getAll() {
        const result = this.pavilhaoRepository.getAll();
        return result;
    }
    
    async update(id: number, data: PavilhaoSchema): Promise<Pavilhao> {
        const pavilhao = await this.pavilhaoRepository.findById(id);
        if (!pavilhao) {
            throw new ApiError(404, 'Pavilhão não encontrado');
        }

        const result = await this.pavilhaoRepository.update(id, data);
        return result;
    }

    async delete(id: number): Promise<void> {
        const pavilhao = await this.pavilhaoRepository.findById(id);
        
        if (!pavilhao) {
            throw new ApiError(404, 'Pavilhão não encontrado');
        }

        await this.pavilhaoRepository.delete(id);
    }

}