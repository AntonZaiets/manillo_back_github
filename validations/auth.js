import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Неверный Email адресс').isEmail(),
    body('password', 'Пароль больше 5 символов').isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'Неверный Email адресс').isEmail(),
    body('password', 'Пароль больше 5 символов').isLength({min: 5}),
    body('fullName', 'Укажите Имя').isLength({min: 3}),
    body('avatarUrl', 'Неверная ссылка').optional().isURL(),
]
