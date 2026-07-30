import express from "express"
import { budgetsService } from "../services/budgetsService.js"
import { budgetsRepo } from "../repos/budgetsRepo.js"
import { spendsService } from "../services/spendsService.js"
import { spendsRepo } from "../repos/spendsRepo.js"


const service = budgetsService(budgetsRepo)
const spendsServices = spendsService(spendsRepo)

export const router = express.Router()

router.post("/", async (req, res) => {
    const result = await service.createBudget(req.body)
    res.status(201).send(result)
})

router.get("/", async (req, res) => {
    const filter = req.query
    const result = await service.getByFilter(filter)
    res.status(200).send(result)
})

router.get("/:id/transactions", async (req, res) => {
    const {id} = req.params
    const result = await spendsServices.getByBudgetId(id)
    res.status(200).send(result)

})

router.post("/:id/spend", async (req, res) => {
    const {id} = req.params
    const result = await spendsServices.create(id, req.body)
    res.status(201).send(result)
})