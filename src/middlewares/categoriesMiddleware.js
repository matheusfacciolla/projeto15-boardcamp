import { categorySchema } from "../schemas/categorySchemas.js";

export function validateCategory(req, res, next) {
    const { name } = req.body;
    const { error } = categorySchema.validate(req.body, { abortEarly: false });

    if (error) {
        res.status(422).send(error.details.map((detail) => detail.message));
        return;
    }

    next();

    //is missing category existing validation -> (conflict 409)
}