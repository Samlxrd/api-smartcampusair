import { ApiError } from "../errors";
import { SalaRepository } from "../sala/sala.interface";
import { SalaRepositoryPrisma } from "../sala/sala.repository";
import { ArCondicionado, ArCondicionadoRepository } from "./ar.interface";
import { ArCondicionadoRepositoryPrisma } from "./ar.repository";
import { CreateArCondicionadoSchema } from "./ar.schema";

export class ArCondicionadoUseCase {
    private arCondicionadoRepository: ArCondicionadoRepository;
    private salaRepository: SalaRepository;
    constructor() {
        this.arCondicionadoRepository = new ArCondicionadoRepositoryPrisma();
        this.salaRepository = new SalaRepositoryPrisma();
    }

    async create(data: CreateArCondicionadoSchema): Promise<ArCondicionado> {
        const salaExists = await this.salaRepository.findById(data.id_sala);

        if(!salaExists) {
            throw new ApiError(404, 'Essa sala não está cadastrada no sistema.')
        }

        const result = this.arCondicionadoRepository.create(data);
        return result;
    }

    async get(id: number): Promise<ArCondicionado[]> {
        const salaExists = await this.salaRepository.findById(id);

        if(!salaExists) {
            throw new ApiError(404, 'Essa sala não está cadastrada no sistema.')
        }

        const result = this.arCondicionadoRepository.getBySala(id);
        return result;
    }

    async find(id: number): Promise<ArCondicionado | null> {
        const arExists = await this.arCondicionadoRepository.get(id);

        if(!arExists) {
            throw new ApiError(404, 'Esse ar condicionado não está cadastrado no sistema.')
        }

        return arExists;
    }

    async delete(id: number): Promise<void> {
        const arExists = await this.arCondicionadoRepository.get(id);

        if(!arExists) {
            throw new ApiError(404, 'Esse ar condicionado não está cadastrado no sistema.')
        }

        await this.arCondicionadoRepository.delete(id);
    }

}