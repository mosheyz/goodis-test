import { ObjectId } from "mongodb";
import { connectToMongo } from "../db/mongodb.js";

const benefits = await connectToMongo();

export const benefitsRepo = {
    create: async (benefit) => {
        const result = await benefits.insertOne(benefit);
        return result.insertedId;
    },

    findBySoldierId: async (soldierId) => {
        const result = await benefits.findOne({
            soldierId: soldierId,
        });
        return result;
    },

    update: async (soldierId, data) => {
        const result = await benefits.updateOne(
            { soldierId: soldierId },
            { $set: data },
        );
        return result.modifiedCount;
    },
};

// console.log(await benefitsRepo.addBenefit(
//     "6a69ea55d98d4ef1ea1fb959",
// {unit: "8200",
// benefitType: "giftCard",
// details: {cardProvider: "goodis",
//     monthlyValue: 400,
//     validMerchants: ["goldis", "hayehudit"]
// },
// decisionReason: "Because",
// budgetApproved: true,
//     startDate: Date.now()
// }))
// console.log(await benefitsRepo.create({unit: "8200",
//     soldierId: new ObjectId(),
//     unit: "8200",
//     currentBenefitType: "giftCard",
//     history: []
// // }))
// console.log(await benefitsRepo.findBySoldierId("6a69ea55frd9ft"))
// console.log(await benefitsRepo.find("6a69ea55d98d4ef1ea1fb958"))
