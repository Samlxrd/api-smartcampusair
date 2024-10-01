import { ApiError } from "../errors";
import { Sala, SalaRepository } from "./sala.interface";
import { SalaRepositoryPrisma } from "./sala.repository";
import { CreateSalaSchema, UpdateSalaSchema } from "./sala.schema";

export class SalaUsecase {
    private salaRepository: SalaRepository;
    constructor() {
        this.salaRepository = new SalaRepositoryPrisma();
    }

    async create(data: CreateSalaSchema): Promise<Sala> {

        const salaExists = await this.salaRepository.findByName(data.nome)
        if (salaExists) {
            throw new ApiError(409, 'Esse nome de sala já está registrado no sistema.');
        }

        const result = this.salaRepository.create(data);

        return result;
    }

    async getAll(): Promise<Sala[]> {
        const result = this.salaRepository.getAll();
        return result;
    }

    async update(id: number, data: UpdateSalaSchema): Promise<Sala> {
        const sala = await this.salaRepository.findById(id);
        if (!sala) {
            throw new ApiError(404, 'Sala não encontrada');
        }

        if(!data.nome) {
            data.nome = sala.nome
            const result = this.salaRepository.update(id, data);
            return result;
        } 

        const salaExists = await this.salaRepository.findByName(data.nome);

        if (salaExists && salaExists.id !== id) {
            throw new ApiError(409, 'Esse nome de sala já está registrado no sistema.');
        }

        const result = await this.salaRepository.update(id, data);
        return result;
    }

    async delete(id: number): Promise<void> {
        
        const sala = await this.salaRepository.findById(id);

        if (!sala) {
            throw new ApiError(404, 'Sala não encontrada');
        }

        await this.salaRepository.delete(id);
    }
}