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
