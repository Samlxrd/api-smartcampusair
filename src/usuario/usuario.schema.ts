import { z } from "zod";

export const createUsuarioSchema = z.object({
    nome_usuario: z.string({ message: 'Você deve informar o seu nome de usuário.' }),
    senha: z.string({ message: 'Você deve definir uma senha.' }).min(8, { message: 'Sua senha deve ter no mínimo 8 caracteres.' }),
    nome_completo: z.string({ message: 'Você deve informar o seu nome completo.' }),
    matricula: z.coerce
    .number({ message: 'Você deve informar a sua matrícula.' })
    .int({ message: 'A matrícula deve ser um número inteiro.' })
    .positive({ message: 'Matrícula inválida.' }),
    funcao: z.string({ message: 'Você deve informar a sua função.' })
})

export type CreateUsuarioSchema = z.infer<typeof createUsuarioSchema>;