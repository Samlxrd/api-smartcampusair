-- CreateTable
CREATE TABLE "ocorrencia" (
    "id" SERIAL NOT NULL,
    "momento" TIMESTAMP(6) NOT NULL,
    "temperatura" DOUBLE PRECISION NOT NULL,
    "presenca" BOOLEAN NOT NULL,
    "id_user" INTEGER,
    "id_sala" INTEGER NOT NULL,

    CONSTRAINT "ocorrencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sala" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "id_pav" INTEGER NOT NULL,
    "andar" INTEGER NOT NULL,
    "presenca" BOOLEAN NOT NULL,
    "temperatura" DOUBLE PRECISION,
    "modo_automatico" BOOLEAN DEFAULT false,

    CONSTRAINT "sala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pavilhao" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "pavilhao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome_usuario" VARCHAR(50) NOT NULL,
    "senha" VARCHAR(100) NOT NULL,
    "nome_completo" VARCHAR(100) NOT NULL,
    "matricula" INTEGER NOT NULL,
    "funcao" VARCHAR(255) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_nome_usuario_key" ON "usuario"("nome_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_matricula_key" ON "usuario"("matricula");

-- AddForeignKey
ALTER TABLE "ocorrencia" ADD CONSTRAINT "ocorrencia_id_sala_fkey" FOREIGN KEY ("id_sala") REFERENCES "sala"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ocorrencia" ADD CONSTRAINT "ocorrencia_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sala" ADD CONSTRAINT "sala_id_pav_fkey" FOREIGN KEY ("id_pav") REFERENCES "pavilhao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
