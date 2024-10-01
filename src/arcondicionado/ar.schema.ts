import { z } from "zod";

export const createArCondicionadoSchema = z.object({
    id_sala: z.number({ message: 'Você deve informar o id da sala.'})
    .int({ message: 'O id da sala deve ser um número inteiro.'})
    .nonnegative({ message: 'Id inválido.'}),
    status_atual: z.boolean({ message: 'Você deve informar o status do ar condicionado.'}).default(false)
})

export type CreateArCondicionadoSchema = z.infer<typeof createArCondicionadoSchema>;