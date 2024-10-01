import { prisma } from "../database/prisma-client";
import { ArCondicionado, ArCondicionadoRepository } from "./ar.interface";
import { CreateArCondicionadoSchema } from "./ar.schema";

export class ArCondicionadoRepositoryPrisma implements ArCondicionadoRepository {
    async create(data: CreateArCondicionadoSchema): Promise<ArCondicionado> {
        const result = await prisma.arcondicionado.create({
            data: {
                id_sala: data.id_sala,
                status_atual: data.status_atual,
            }
        });
        return result;
    }
    
    async get(id: number): Promise<ArCondicionado | null> {
        const result = await prisma.arcondicionado.findFirst({
            where: {
                id
            }
        });
        return result
    }

    async getBySala(id: number): Promise<ArCondicionado[]> {
        const result = await prisma.arcondicionado.findMany({
            where: {
                id_sala: id
            }
        });
        return result
    }

    async delete(id: number): Promise<void> {
        await prisma.arcondicionado.delete({
            where: {
                id
            }
        });
    }
}