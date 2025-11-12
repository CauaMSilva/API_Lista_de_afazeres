import express from "express";
import "dotenv/config";
import sequelize from "./models/tarefa.js";
import tarefaRoutes from "./routes/tarefas.js";

const server = express();
server.use(express.json());
server.use("/tarefas", tarefaRoutes);

try {
    await sequelize.sync({ alter: true });
    console.log("Banco sincronizado com sucesso ");
} catch (erro) {
    console.error("Erro ao conectar no banco: ");
}

server.listen(process.env.PORT, () => {
    console.log("servidor rodando");
});