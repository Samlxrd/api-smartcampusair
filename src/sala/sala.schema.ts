import z from 'zod'

export const createSalaSchema = z.object({
    nome: z.string({ message: 'Você deve informar o nome / código da sala.'}),
    pavilhao: z.string({ message: 'Você deve informar o pavilhão da sala.'}),
    andar: z.coerce
    .number({ message: 'Você deve informar o andar da sala.'})
    .int({ message: 'O andar da sala deve ser um número inteiro.'})
    .nonnegative({ message: 'Andar inválido.'}),
});

export type CreateSalaSchema = z.infer<typeof createSalaSchema>;

export const updateSalaSchema = z.object({
    nome: z.string().optional(),
    pavilhao: z.string().optional(),
    andar: z.coerce.number()
    .int({ message: 'O andar da sala deve ser um número inteiro.'})
    .nonnegative({ message: 'Andar inválido.'})
});

export type UpdateSalaSchema = z.infer<typeof updateSalaSchema>;