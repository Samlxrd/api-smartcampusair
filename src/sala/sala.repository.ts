import { prisma } from "../database/prisma-client";
import { Sala, SalaRepository } from "./sala.interface";
import { CreateSalaSchema, UpdateSalaSchema, UpdateStatusSalaSchema } from "./sala.schema";

export class SalaRepositoryPrisma implements SalaRepository {
    async create(data: CreateSalaSchema): Promise<Sala> {
        const result = await prisma.sala.create({
            data: {
                nome: data.nome,
                id_pav: data.id_pav,
                andar: data.andar,
                status_atual: data.status_atual
            }
        });
        return result;
    }

    async findByName(nome: string): Promise<Sala | null> {
        const result = await prisma.sala.findFirst({
            where: {
                nome
            }
        });
        return result;
    }

    async findById(id: number): Promise<Sala | null> {
        const result = await prisma.sala.findFirst({
            where: {
                id
            }
        });
        return result;
    }

    async getAll(): Promise<Sala[]> {
        const salasPorPavilhao = await prisma.$queryRaw`
        SELECT p.nome as pavilhao, array_agg(json_build_object('id', s.id, 'nome', s.nome, 'andar', s.andar, 'status_atual', s.status_atual) ORDER BY s.andar ASC) AS salas
        FROM sala s
        JOIN pavilhao p ON s.id_pav = p.id
        GROUP BY p.nome
        ORDER BY p.nome ASC;
        ` as Sala[];
        return salasPorPavilhao;
    }

    async update(id: number, data: UpdateSalaSchema): Promise<Sala> {
        const result = await prisma.sala.update({
            where: { id },
            data: {
                nome: data.nome,
                id_pav: data.id_pav,
                andar: data.andar,
                status_atual: data.status_atual
            }
        });
        return result;
    }

    async updateStatus(id: number, data: UpdateStatusSalaSchema): Promise<Sala> {
        const result = await prisma.sala.update({
            where: { id },
            data: {
                status_atual: data.presence
            }
        });
        return result;
    }

    async delete(id: number): Promise<void> {
        await prisma.sala.delete({
            where: { id }
        });
    }
}