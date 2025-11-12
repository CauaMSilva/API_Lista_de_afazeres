import express from "express";
import Tarefa from "../models/tarefa.js";

const router = express.Router();
//GET LER
router.get("/", async (req, res) => {
    try {
        const tarefas = await Tarefa.findAll();
        res.status(200).json(tarefas);
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
    
});

router.get("/:id", async (req, res) => {
    try {
        const tarefa = await Tarefa.findByPk(req.params.id);
        if (!tarefa)
            return res.status(404).json({error: "tarefa não encontrada"});
        res.status(200).json(tarefa);
    } catch(erro) {
        res.json({ error: erro.message });
    }
    
});
//PUT ATUALIZAR
router.put("/:id", async (req, res) => {
    try{
        const tarefa = await Tarefa.findByPk(req.params.id);
        if (!tarefa)
          return res.status(404).json({error: "Tarefa não encontrada"});
        await tarefa.update(req.body);
        res.json(tarefa);
    } catch(erro) {
        res.status(500).json({ error: erro.message });
    }
    
});
//PUT PATCH STATUS
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const tarefa = await Tarefa.findByPk(id);
        
        if (!tarefa)
            res.status(404).json({ error: "Tarefa não encontrada " });

        tarefa.status = status;

        await tarefa.save();
        
        res.status(200).json({ mensagem: "Tarefa atualizada com sucesso" });
    } catch (erro) {
        res.status(500).json({ error: erro.message});
    }
});
//POST CRIAR
router.post("/", async (req, res) => {
    try {
        const tarefa = await Tarefa.create(req.body);
        res.status(201).json(tarefa);
    } catch (error) {
        res.status(500).send({erro: error.message});
    }
});
//DELETE DELETAR
router.delete("/:id", async (req, res) => {
    try {
        const tarefa = await Tarefa.findByPk(req.params.id);
        if (!tarefa)
            return res.status(404).json({error: "Tarefa não encontrada "});
        await tarefa.destroy();
        res.json({message: "Tarefa deletada com sucesso"});
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
});

export default router;