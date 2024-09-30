import { prisma } from "../database/prisma-client";
import { Sala, SalaRepository } from "./sala.interface";
import { CreateSalaSchema, UpdateSalaSchema } from "./sala.schema";

export class SalaRepositoryPrisma implements SalaRepository {
    async create(data: CreateSalaSchema): Promise<Sala> {
        const result = await prisma.sala.create({
            data: {
                nome: data.nome,
                pavilhao: data.pavilhao,
                andar: data.andar,
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
        SELECT pavilhao, array_agg(json_build_object('nome', nome, 'andar', andar) ORDER BY andar ASC) AS salas
        FROM sala
        GROUP BY pavilhao
        ORDER BY pavilhao ASC;
        ` as Sala[];
        return salasPorPavilhao;
    }

    async update(id: number, data: UpdateSalaSchema): Promise<Sala> {
        const result = await prisma.sala.update({
            where: { id },
            data: {
                nome: data.nome,
                pavilhao: data.pavilhao,
                andar: data.andar
            }
        });
        return result;
    }

    async delete(id: number): Promise<void> {
        await prisma.sala.delete({
            where: {
                id
            }
        });
    }
}