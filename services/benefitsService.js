import { ObjectId } from "mongodb";
import { z } from "zod";


const createBenefitSchema = z.object({
    unit: z.string().min(1),
    benefitType: z.string(),
    details: z.object(),
    decisionReason: z.string(),
    budgetAprove: z.string(),
});

const diningHallDetails = z.object({
    baseId: z.string(),
    kosherLevel: z.string(),
    mealTimes: z.array(z.string()),
});

const giftCardDetails = z.string({
    cardProvider: z.string(),
    monthlyValue: z.number().min(0),
    validMerchants: z.array(z.string()),
});

const updateBenefitSchema = z.object({
    benefitType: z.string(),
    details: z.object(),
    decisionReason: z.string(),
    budgetAprove: z.string(),
    decisionDate: z.string().optional(),
});

export function benefitsService(repo) {
    return {
        createBenefit: async (soldierId, benefit) => {
            if (await repo.findBySoldierId(soldierId)) {
                const err = new Error(
                    `already existing benefit for soldierId ${soldierId}`,
                );
                err.status = 409;
                throw err;
            }

            let { unit, benefitType, details, decisionReason, budgetAprove } =
            benefit;

            const validBenefit = createBenefitSchema.safeParse(benefit);
            if (
                !validBenefit.success ||
                !["true", "false", "0", "1"].includes(budgetAprove)
            ) {
                const err = new Error("Missing fields, " + validBenefit.error);
                err.status = 400;
                throw err;
            }

            if (benefitType === "diningHall") {
                const result = diningHallDetails.safeParse(benefitType);
                if (!result.success) {
                    const err = new Error("Missing diningHall fields" + result.error);
                    err.status = 400;
                    throw err;
                }
            } else if (benefitType === "giftCard") {
                const result1 = giftCardDetails.safeParse(benefitType);
                if (!result1.success) {
                    const err = new Error("Missing giftCard fields" + result1.error);
                    err.status = 400;
                    throw err;
                }
            }

            budgetAprove = Number(budgetAprove);
            const updateData = {
                soldierId: soldierId,
                unit,
                currentBenefitType: benefitType,
                history: [
                    {
                        startDate: Date.now(),
                        endDate: null,
                        decisionReason,
                        budgetAprove,
                        benefitType,
                        details,
                    },
                ],
            };

            const result = await repo.create(updateData);
            return await repo.findBySoldierId(soldierId);
        },

        getBenefitBySoldierId: async (soldierId) => {
            const result = await repo.findBySoldierId(soldierId);
            if (!result) {
                const err = new Error("Benefit not found");
                err.status = 404;
                throw err;
            }

            return result;
        },

        updateBenefit: async (soldierId, data) => {
            const validData = updateBenefitSchema.safeParse(data);
            if (!validData.success) {
                const err = new Error("Missing fields" + validData.error);
                err.status = 400;
                throw err;
            }

            const benefit = await repo.findBySoldierId(soldierId);
            if (!benefit) {
                const err = new Error("Benefit not found");
                err.status = 404;
                throw err;
            }

            const updatedHistory = benefit.history.map((item) => {
                if (item.endDate === null)
                    return { ...item, endDate: Date.now() };
                return item;
            });

            const updatedData = {
                benefitType: data.benefitType,
                details: data.details,
                decisionReason: data.decisionReason,
                budgetAprove: data.budgetAprove,
                startDate: Date.now(),
                endDate: null,
            };

            updatedHistory.push(updatedData);

            await repo.update(soldierId, {
                currentBenefitType: data.benefitType,
                history: updatedHistory,
            });

            return await repo.findBySoldierId(soldierId);
        },
    };
}
