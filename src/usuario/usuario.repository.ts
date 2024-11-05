import { prisma } from "../database/prisma-client";
import { ReturnUser, Usuario, UsuarioRepository } from "./usuario.interface";
import { CreateUsuarioSchema } from "./usuario.schema";

export class UsuarioRepositoryPrisma implements UsuarioRepository {
    async create(data: CreateUsuarioSchema): Promise<ReturnUser> {
        console.log(data);
        try {

            const result = await prisma.usuario.create({
                data: {
                    nome_usuario: data.nome_usuario,
                    senha: data.senha,
                    nome_completo: data.nome_completo,
                    matricula: data.matricula,
                    funcao: data.funcao
                }
            });
            return new ReturnUser(result);
        } catch (error) {
            console.log(error);
            throw error; 
        }   
    }

    async findByMatricula(matricula: number): Promise<ReturnUser | null> {
        const result = await prisma.usuario.findFirst({
            where: {
                matricula
            }
        });
        return result ? new ReturnUser(result) : null;
    }

    //Revisar a partir daqui
    async findById(id: number): Promise<ReturnUser | null> {
        const result = await prisma.usuario.findFirst({
            where: {
                id
            }
        });
        return result ? new ReturnUser(result) : null;
    }

    async getAll(): Promise<ReturnUser[]> {
        const result = await prisma.usuario.findMany();
        return result.map(usuario => new ReturnUser(usuario));
    }

    async update(id: number, data: CreateUsuarioSchema): Promise<ReturnUser> {
        const result = await prisma.usuario.update({
            where: { id },
            data: {
                nome_usuario: data.nome_usuario,
                senha: data.senha,
                nome_completo: data.nome_completo,
                matricula: data.matricula,
                funcao: data.funcao
            }
        });
        return new ReturnUser(result);
    }

    async delete(id: number): Promise<void> {
        await prisma.usuario.delete({
            where: { id }
        });
    }
}