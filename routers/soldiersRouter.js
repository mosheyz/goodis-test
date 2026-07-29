import express from "express"
import { benefitsRepo } from "../repos/benefitsRepo.js";
import { benefitsService } from "../services/benefitsService.js";

const service = benefitsService(benefitsRepo)

export const router = express.Router()

router.post("/", async (req, res) => {
    const [result] = await service.createBenefit(req.query, req.body)
    res.status(201).send(result)
})

router.get("/", (req, res) => {
    
})

router.patch("/", (req, res) => {
    
})