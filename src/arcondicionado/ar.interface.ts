import { CreateArCondicionadoSchema } from "./ar.schema";

export interface ArCondicionado {
    id: number;
    id_sala: number;
    status_atual: boolean;
}

export interface ArCondicionadoRepository {
    create(data: CreateArCondicionadoSchema): Promise<ArCondicionado>;
    getBySala(id: number): Promise<ArCondicionado[]>;
    get(id: number): Promise<ArCondicionado | null>;
    delete(id: number): Promise<void>;
}