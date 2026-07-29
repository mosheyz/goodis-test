import { benefitsRepo } from "../repos/benefitsRepo.js";

export function benefitsService(repo) {
    return {
        createBenefit: (benefit) => {
            if (repo.findById) {
                const err = new Error("Already exists")
                err.status = 409
                throw err
            }

        },

        getBenefitById: (id) => {

        },

        updateBenefit: (id, data) => {

        } 
    }
}
