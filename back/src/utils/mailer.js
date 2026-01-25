import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true solo si se usa 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Verificación de correo
export async function sendVerificationEmail(email, code) {

    if (!email) {
        throw new Error("Email destinatario no definido");
    }
    await transporter.sendMail({
        from: `"Librería" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Verifica tu cuenta",
        text: `Tu código de verificación es: ${code}`,
    });
}

// Reset de contraseña
export async function sendResetPasswordEmail(email, token) {
    await transporter.sendMail({
        from: `"Librería" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Recuperar contraseña",
        text: `Tu token para resetear contraseña es: ${token}`,
    });
}
