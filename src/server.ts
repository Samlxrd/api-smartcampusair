import fastify, { FastifyInstance } from "fastify";
import { salaRoutes } from "./sala/sala.routes";
import { ApiError } from "./errors";
import { z } from "zod";
import { arCondicionadoRoutes } from "./arcondicionado/ar.routes";
import { pavilhaoRoutes } from "./pavilhao/pavilhao.routes";
import { usuarioRoutes } from "./usuario/usuario.routes";

const app: FastifyInstance = fastify();

app.register(salaRoutes, {
    prefix: 'salas'
});

app.register(arCondicionadoRoutes, {
    prefix: 'ar'
})

app.register(pavilhaoRoutes, {
    prefix: 'pavilhoes'
})

app.register(usuarioRoutes, {
    prefix: 'usuarios'
})

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ApiError) {
        reply
        .status(error.statusCode)
        .send({ message: error.message })
    } 
    else if (error instanceof z.ZodError) {
        reply
        .status(400)
        .send({ message: error.errors[0].message })
    }
    else {
        reply
        .status(500)
        .send({ message: 'Erro interno no servidor.' })
    }
})

app.listen({ port: 5100}, () => {
    console.log('[🚀] http://localhost:5100/')
    console.log(app.printRoutes())
})