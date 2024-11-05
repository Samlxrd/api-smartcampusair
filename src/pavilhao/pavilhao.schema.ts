import { z } from "zod";

export const pavilhaoSchema = z.object({
    nome: z.string({ message: 'Você deve informar o nome do pavilhão.'})
})

export type PavilhaoSchema = z.infer<typeof pavilhaoSchema>;