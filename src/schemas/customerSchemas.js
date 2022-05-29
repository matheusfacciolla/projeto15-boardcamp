import joi from "joi";
import DateExtension from '@joi/date';

const Joi = joi.extend(DateExtension);

export const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().pattern(/^[0-9]{10,11}$/).required(), 
    cpf: joi.string().pattern(/^[0-9]{11}$/).required(), 
    birthday: Joi.date().format('YYYY-MM-DD').required()
});