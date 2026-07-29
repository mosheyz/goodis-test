import { ObjectId } from "mongodb"
import { connectToMongo } from "../db/mongodb.js"

const benefits = await connectToMongo()

export const benefitsRepo = {
    create: async (benefit) => {
        const result = await benefits.insertOne(benefit)
        return result.insertedId.toString()
    },

    addBenefit: async (id, benefit) => {
        const result = await benefits.updateOne({_id: new ObjectId(id)}, {$push: {history: {benefit}}})
        return result.modifiedCount
    },

    findById: async (id) => {
        const result = await benefits.findOne({_id: new ObjectId(id)})
        if (result.length > 0) {
            result.id = result._id.toString()
            delete result._id }
        return result
    },

    update: async (id, data) => {
        const result = await benefits.updateOne({_id: new ObjectId(id)}, {$set: {data}})
        return result.modifiedCount
    }
}

// console.log(await benefitsRepo.addBenefit(
//     "6a69c92ee148d4234530653f", 
//     {unit: "8200",
//     benefitType: "giftCard",
//     details: {cardProvider: "goodis",
//         monthlyValue: 400,
//         validMerchants: ["goldis", "hayehudit"]
//     },
//     decisionReason: "Because",
//     budgetApproved: true,
//     startDate: Date.now()
// }))
// console.log(await benefitsRepo.create({unit: "8200",
//     id: new ObjectId(),
//     soldierId: new ObjectId(),
//     unit: "8200",
//     currentBenefitType: "giftCard",
//     history: []
// }))
// console.log(await benefitsRepo.findById("6a69c92ee148d4234530653f"))