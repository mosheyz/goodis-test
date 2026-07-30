import { budgets } from "../db/supabase.js";

export const budgetsRepo = {
    create: async (budget) => {
        const {data, error} = await budgets.insert(budget).select("*")
        return {data, error}
    },

    get: async () => {
            const {data, error} = await budgets.select("*")
        return {data, error}
    },

    getById: async (id) => {
        const {data, error} = await budgets.select("*").eq("id", id)
        return {data, error}
    }
}