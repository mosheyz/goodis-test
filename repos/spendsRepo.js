import { spends } from "../db/supabase.js";

export const spendsRepo = {
    create: async (spend) => {
        const {data, error} = await spends.insert(spend).select()
        return {data, error}
    },

    getByBudgetId: async (budgetId) => {
        const {data, error} = await spends.select("*").eq("budgetId", budgetId)
        return {data, error}
    }
}