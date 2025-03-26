import nodemailer from 'nodemailer'

export default async (subject, message, send_to, send_from, reply_to) => {
    console.log(11111, subject)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        logger: true,
        debug: true,
        secureConnection: false,
        auth: {
            user: 'alexdenisenko94@gmail.com',
            pass: 'pdesmyzgjxdbzwpn',
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const mailOptions = {
        from: 'alexdenisenko94@gmail.com',
        to: 'alexdenisenko94@gmail.com',
        subject: subject,
        text: message
    };

    await transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Email sent successfully");
        }
    });
}