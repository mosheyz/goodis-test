import { z } from "zod";


const spendSchema = z.object({
    amount: z.number(),
    reason: z.string().optional()
})


export function spendsService(repo) {
    return {
        create: async (budgetId, spend) => {
            // צריך לבדוק שכל העסקאות של ההקצאה הזו לר עולים על סך התקציב שלה
            const validSpend = spendSchema.safeParse(spend)
            if (!validSpend.success) {
                const err = new Error("Missing fields, " + validSpend.error);
                err.status = 400;
                throw err;
            }
        },
        getByBudgetId: async (budgetId) => {}
    };
}
