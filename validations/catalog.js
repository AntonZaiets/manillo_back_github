import { body } from "express-validator";

export const catalogCreateValidation = [
    body('title', 'Введіть заголовок статьи').isLength({min: 3}).isString(),
    body('text', 'Введіть текст').isLength({min: 10}).isString(),
    body('price', 'Введіть ціну').isNumeric(),
    body('tags', 'Неправильний формат тегів').optional().isArray(),
    //body('size', 'Неправильний формат розмірів').optional().isArray(),
    //body('colors', 'Неправильний формат').optional().isArray(),
    body('imageUrl', 'Неправильне посилання').optional().isArray(),
]
