import { CreateSalaSchema, UpdateModoAutomaticoSchema, UpdateSalaSchema, UpdateStatusSalaSchema } from "./sala.schema";

export interface Sala {
    id: number;
    nome: string;
    id_pav: number;
    andar: number;
    presenca: boolean;
}

export interface SalaRepository {
    create(data: CreateSalaSchema): Promise<Sala>;
    findByName(nome: string): Promise<Sala | null>;
    getAll(): Promise<Sala[]>;
    update(id: number, data: UpdateSalaSchema): Promise<Sala>;
    updateStatus(id: number,data: UpdateStatusSalaSchema): Promise<Sala>;
    updateMode(id: number, data: UpdateModoAutomaticoSchema): Promise<Sala>;
    findById(id: number): Promise<Sala | null>;
    delete(id: number): Promise<void>;
}