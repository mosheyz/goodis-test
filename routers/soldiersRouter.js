import express from "express";
import { benefitsRepo } from "../repos/benefitsRepo.js";
import { benefitsService } from "../services/benefitsService.js";

const service = benefitsService(benefitsRepo);

export const router = express.Router();

router.post("/:soldierId/benefits", async (req, res) => {
    const { soldierId } = req.params;
    const result = await service.createBenefit(soldierId, req.body);
    res.status(201).send(result);
});

router.get("/:soldierId/benefits", async (req, res) => {
    const { soldierId } = req.params;
    const result = await service.getBenefitBySoldierId(soldierId);
    res.status(200).send(result);
});

router.patch("/:soldierId/benefits", async (req, res) => {
    const { soldierId } = req.params;
    console.log(req.body)
    const result = await service.updateBenefit(soldierId, req.body)
    res.status(200).send(result)
});
