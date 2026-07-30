import express from "express"
import { budgetsService } from "../services/budgetsService.js"
import { budgetsRepo } from "../repos/budgetsRepo.js"


const service = budgetsService(budgetsRepo)
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

router.get("/:id/transactions", (req, res) => {

})

router.post("/:id/spend", (req, res) => {

})