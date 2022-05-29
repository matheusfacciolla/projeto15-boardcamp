import Joi from "joi";

export const rentalSchema = Joi.object({
    customerId: Joi.number().integer().min(1),
    gameId: Joi.number().integer().min(1),
    daysRented: Joi.number().integer().min(1)
});