import fastify, { FastifyInstance } from "fastify";

const app: FastifyInstance = fastify();

app.listen({ port: 5000}, () => {
    console.log('[🚀] http://localhost:5000/')
})