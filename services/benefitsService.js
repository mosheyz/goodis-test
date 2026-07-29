import { ObjectId } from "mongodb";


export function benefitsService(repo) {
    return {
        createBenefit: async (soldierId, benefit) => {
            // console.log(repo.findBySoldierId(soldierId))
            if (repo.findBySoldierId(soldierId)) {
                const err = new Error(repo.findBySoldierId(soldierId));
                err.status = 409;
                throw err;
            }

            const { unit, benefitType, details, decisionReason, budgetAprove } =
                benefit;
            if (!unit || !benefitType || !details || !budgetAprove) {
                const err = new Error("Missing fields");
                err.status = 400;
                throw err;
            }

            if (benefitType === "diningHall") {
                const { baseId, kosherLevel, mealTimes } = details;
                if (!baseId || !kosherLevel || !mealTimes) {
                    const err = new Error("Missing fields");
                    err.status = 400;
                    throw err;
                }
            }

            if (benefitType === "giftCard") {
                const { cardProvider, monthlyValue, validMerchants } = details;
                if (!cardProvider || !monthlyValue || !validMerchants) {
                    const err = new Error("Missing fields");
                    err.status = 400;
                    throw err;
                }
            }

            benefit.startDate = Date.now()
            benefit.id = new ObjectId()
            benefit.soldierId = soldierId
            updateData = {id: new ObjectId(), soldierId: soldierId, unit, currentBenefitType: benefitType, history: []}

            const result = await repo.create(updateData)
            await repo.addBenefit(soldierId, {startDate: Date.now(), endDate: null, decisionReason, budgetAprove, benefitType, details})
            return repo.findById(result)
        },

        getBenefitById: (id) => {},

        updateBenefit: (id, data) => {},
    };
}
