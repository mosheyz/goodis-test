import { z } from "zod";

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

            const { data, error } = await repo.create(budget);
            if (error) throw error;
            return data[0];
        },

        getByFilter: async (filter) => {
            // איך עושים פילטר משולב בסופבייס?
            const { unit, benefitType, month } = filter;
            const { data, error } = await repo.get();

            if (error) throw error;
            
            const updatedData = [];
            for (const item of data) {
                if (
                    unit === item.unit &&
                    benefitType === item.benefitType &&
                    month === month
                ) {
                    const err = new Error("Budget already exists");
                    err.status = 409;
                    throw err;
                } 
            }

            return data;
        },
    };
}
