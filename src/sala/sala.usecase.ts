import { ApiError } from "../errors";
import { PavilhaoRepository } from "../pavilhao/pavilhao.interface";
import { PavilhaoRepositoryPrisma } from "../pavilhao/pavilhao.repository";
import { Sala, SalaRepository } from "./sala.interface";
import { SalaRepositoryPrisma } from "./sala.repository";
import { CreateSalaSchema, TurnOffSchema, UpdateModoAutomaticoSchema, UpdateSalaSchema, UpdateStatusSalaSchema } from "./sala.schema";

export class SalaUsecase {
    private salaRepository: SalaRepository;
    private pavilhaoRepository: PavilhaoRepository;
    constructor() {
        this.salaRepository = new SalaRepositoryPrisma();
        this.pavilhaoRepository = new PavilhaoRepositoryPrisma();
    }

    async handleUpdateMode(id: number, data: UpdateModoAutomaticoSchema): Promise<void> {
        const response = await fetch(`http://localhost:5050/status/${id}/mode`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ automaticMode: data.modo_automatico }),
          });
        return response.json();
    }

    async create(data: CreateSalaSchema): Promise<Sala> {

        const salaExists = await this.salaRepository.findByName(data.nome)
        if (salaExists) {
            throw new ApiError(409, 'Esse nome de sala já está registrado no sistema.');
        }

        const pavilhaoExists = await this.pavilhaoRepository.findById(data.id_pav);
        if (!pavilhaoExists) {
            throw new ApiError(404, 'Pavilhão não encontrado');
        }

        const result = this.salaRepository.create(data);

        return result;
    }

    async getById(id: number): Promise<Sala | null> {
        const result = this.salaRepository.findById(id);
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

    async updateStatus(id: number, data: UpdateStatusSalaSchema): Promise<Sala> {
        const sala = await this.salaRepository.findById(id);
        
        if (!sala) {
            throw new ApiError(404, 'Sala não encontrada');
        }

        const result = await this.salaRepository.updateStatus(id, data);
        return result;
    }

    async updateMode(id: number, data: UpdateModoAutomaticoSchema): Promise<Sala> {
        const sala = await this.salaRepository.findById(id);

        if (!sala) {
            throw new ApiError(404, 'Sala não encontrada');
        }

        const result = await this.salaRepository.updateMode(id, data);
        await this.handleUpdateMode(id, data);

        return result;
    }

    async delete(id: number): Promise<void> {
        
        const sala = await this.salaRepository.findById(id);

        if (!sala) {
            throw new ApiError(404, 'Sala não encontrada');
        }

        await this.salaRepository.delete(id);
    }

    async turnOff(id: number, data: TurnOffSchema): Promise<void> {
        const sala = await this.salaRepository.findById(id);

        if (!sala) {
            throw new ApiError(404, 'Sala não encontrada');
        }
        
        const response = await fetch(`http://localhost:5050/leitura/${id}/turnoff`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return response.json();
    }
}