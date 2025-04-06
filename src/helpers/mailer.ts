import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // creating a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000, // 1 hour
            });
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
            });
        }

        // Mailtrap transporter
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });

        const routePath = emailType === 'VERIFY' ? 'verifyemail' : 'reset-password';
        const fullLink = `${process.env.DOMAIN}/${routePath}?token=${hashedToken}`;

        const mailOptions = {
            from: 'aniketjha917928@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify Your Email 📩' : 'Reset Your Password 🔑',
            html: `
                <p>
                    Click <a href="${fullLink}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}.
                    <br/>
                    Or copy and paste the link below in your browser:
                </p>
                <p>${fullLink}</p>
            `
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}
