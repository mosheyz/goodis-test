import { z } from "zod";
import { spendsRepo } from "../repos/spendsRepo.js";
import { spendsService } from "./spendsService.js";


const budgetSchema = z.object({
    unit: z.string(),
    benefitType: z.string(),
    month: z.string(),
    allocatedAmount: z.number(),
});

export function budgetsService(repo) {
    return {
        createBudget: async (budget) => {
            const validBudget = budgetSchema.safeParse(budget);
            if (!validBudget.success) {
                const err = new Error("Missing fields, " + validBudget.error);
                err.status = 400;
                throw err;
            }

            const { unit, benefitType, month } = budget;
            const { data: exist, error: existError } = await repo.get({
                unit,
                benefitType,
                month,
            });
            if (exist.length > 0 || existError) {
                const err = new Error("Already exist");
                err.status = 409;
                throw err;
            }

            const { data, error } = await repo.create(budget);
            if (error) throw error;
            return data[0];
        },

        getByFilter: async (filter) => {
            const { data, error } = await repo.get(filter);
            if (data.length === 0) {
                const err = new Error("Not found");
                err.status = 404;
                throw err;
            }
            if (error) throw error;

            const updatedData = [];
            for (const item of data) {
                const {data, error} = await spendsRepo.getByBudgetId(item.id);
                console.log(data, item.id)
                
                item.spentAmount = data.reduce(
                    (sum, spend) => sum + spend.amount,
                    0,
                );
                console.log(item.spentAmount)
                item.remainingAmount = item.allocatedAmount - item.spentAmount;
                updatedData.push(item);
            }

            return updatedData;
        },
    };
}
