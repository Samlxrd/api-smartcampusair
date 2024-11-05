import { usuario } from "@prisma/client";
import { CreateUsuarioSchema } from "./usuario.schema";

export interface Usuario {
    id: number;
    nome_usuario: string;
    senha: string;
    nome_completo: string;
    matricula: number;
    funcao: string;
}

export class ReturnUser {
    id: number;
    nome_usuario: string;
    nome_completo: string;
    matricula: number;
    funcao: string;

    constructor(usuario: usuario) {
        this.id = usuario.id;
        this.nome_usuario = usuario.nome_usuario;
        this.nome_completo = usuario.nome_completo;
        this.matricula = usuario.matricula;
        this.funcao = usuario.funcao;
    }
}

export interface UsuarioRepository {
    create(data: CreateUsuarioSchema): Promise<ReturnUser>;
    findByMatricula(matricula: number): Promise<ReturnUser | null>;
    findById(id: number): Promise<ReturnUser | null>;
    getAll(): Promise<ReturnUser[]>;
    update(id: number, data: CreateUsuarioSchema): Promise<ReturnUser>;
    delete(id: number): Promise<void>;
}