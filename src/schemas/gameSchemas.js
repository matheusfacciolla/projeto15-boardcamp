import Joi from "joi";

export const gameSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    stockTotal: Joi.number().integer().min(1),
    categoryId: Joi.number().integer().min(1),
    pricePerDay: Joi.number().integer().min(1),
});