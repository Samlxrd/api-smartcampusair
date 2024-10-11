import { prisma } from "../database/prisma-client";
import { Pavilhao, PavilhaoRepository } from "./pavilhao.interface";
import { PavilhaoSchema } from "./pavilhao.schema";

export class PavilhaoRepositoryPrisma implements PavilhaoRepository {
    async create(pavilhaoData: PavilhaoSchema): Promise<Pavilhao> {
        const result = await prisma.pavilhao.create({
            data: {
                nome: pavilhaoData.nome
            }
        });
        return result;
    }
    
    async getAll(): Promise<Pavilhao[]> {
        const result = await prisma.pavilhao.findMany();
        return result;
    }

    async findByName(nome: string): Promise<Pavilhao | null> {
        const result = await prisma.pavilhao.findFirst({
            where: {
                nome
            }
        });
        return result;
    }

    async findById(id: number): Promise<Pavilhao | null> {
        const result = await prisma.pavilhao.findFirst({
            where: {
                id
            }
        });
        return result;
    }

    async update(id: number, pavilhaoData: PavilhaoSchema): Promise<Pavilhao> {
        const result = await prisma.pavilhao.update({
            where: { id },
            data: {
                nome: pavilhaoData.nome
            }
        });
        return result;
    }

    async delete(id: number): Promise<void> {
        await prisma.pavilhao.delete({
            where: {
                id
            }
        });
    }
}