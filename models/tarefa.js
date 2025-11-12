import { DataTypes } from "sequelize";
import sequelize from "../dataBase.js";

const tarefa = sequelize.define('tarefas', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default tarefa;