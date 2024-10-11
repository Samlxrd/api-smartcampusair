import { PavilhaoSchema } from "./pavilhao.schema";

export interface Pavilhao {
    id: number;
    nome: string;
}

export interface PavilhaoRepository {
    create(pavilhaoData: PavilhaoSchema): Promise<Pavilhao>;
    getAll(): Promise<Pavilhao[]>
    findByName(nome: string): Promise<Pavilhao | null>
    findById(id: number): Promise<Pavilhao | null>
    update(id: number, data: PavilhaoSchema): Promise<Pavilhao>
    delete(id: number): Promise<void>
}