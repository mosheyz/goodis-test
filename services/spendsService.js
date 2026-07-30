import { z } from "zod";
import { budgetsRepo } from "../repos/budgetsRepo.js";

const spendSchema = z.object({
    amount: z.number(),
    reason: z.string().optional(),
});

export function spendsService(repo) {
    return {
        create: async (budgetId, spend) => {
            const validSpend = spendSchema.safeParse(spend);
            if (!validSpend.success) {
                const err = new Error("Missing fields, " + validSpend.error);
                err.status = 400;
                throw err;
            }

            const { data: spends, error: err } =
                await repo.getByBudgetId(budgetId);

            if (!spends || err) {
                let err = new Error("Not found budget");
                err.status = 404;
                throw err;
            }
                const spentAmount = spends.reduce(
                    (sum, spend) => sum + spend.amount,
                    0,
                );

            const { data, error } = await budgetsRepo.getById(budgetId);
            if (error) throw error;

            const allocatedAmount = data[0].allocatedAmount;
            const remainingAmount = allocatedAmount - spentAmount
            

            if (spend.amount > remainingAmount) {
                const err = new Error(`remainingAmount: ${remainingAmount}`);
                err.status = 422;
                throw err;
            }

            spend.budgetId = budgetId

            const { data: success, error: fail } = await repo.create(spend);
            if (fail) throw fail;
            return {success, remainingAmount};
        },

        getByBudgetId: async (budgetId) => {
            const { data, error } = await repo.getByBudgetId(budgetId);
            console.log(data, error)
            if (!data || error) {
                const err = new Error("Not found budget");
                err.status = 404;
                throw err;
            }

            return data;
        },
    };
}
