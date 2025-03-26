import {sendEmail} from "../utils/index.js";

export const send = async (req, res)=>{
    console.log('req, res', req, res)
    try {
        const send_to = 'alexdenisenko94@gmail.com';
        const sent_from = 'alexdenisenko94@gmail.com';
        const reply_to = 'alexdenisenko94@gmail.com';
        const subject = "Нове замовлення";
        const message = `
        Привіт
        Нове замовлення
        
        від - ${req.body?.email}
        додаткова інформація - ${req.body?.text}
    `;

        await sendEmail(subject, message, send_to, sent_from, reply_to);
        res.status(200).json({ success: true, message: "Email Sent" });
    } catch (e) {
        console.log(err)
        res.status(500).json({
            message: 'Не доступа '
        })
    }
}