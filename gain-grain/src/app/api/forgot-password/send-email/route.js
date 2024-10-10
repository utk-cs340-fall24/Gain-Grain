import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { findUserByEmail, generateToken } from '../../../../utils/userModel'

export async function POST(req) {
    const { email } = await req.json();

    try {
        const foundUser = await findUserByEmail(email);
        if(!foundUser.success) {
            return NextResponse.json({ success: false });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASS,
            },
        });

        const resetToken = await generateToken(email);

        if(!resetToken.success) {
            return NextResponse.json({ success: false, message: resetToken.message }, { status: 500 });
        }

        const resetLink = `http://localhost:3000/reset-password?token=${resetToken.token}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'G&G Password Reset Request',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset</title>
                <style>
                    body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                    }
                    .email-container {
                    background-color: #ffffff;
                    padding: 20px;
                    margin: auto;
                    max-width: 600px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                    color: #333333;
                    }
                    p {
                    color: #555555;
                    }
                    .btn {
                    display: inline-block;
                    background-color: #FF8200;
                    color: white;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    font-weight: bold;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    }
                    .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #888888;
                    }
                </style>
                </head>
                <body>

                <div class="email-container">
                    <h1>Password Reset Request</h1>
                    <p>Hi,</p>
                    <p>You recently requested to reset your password for your <strong>Gain & Grain</strong> account. Click the button below to reset it:</p>

                    <a href="${resetLink}" class="btn" style="color: white; text-decoration: none;">Reset Password</a>

                    <p>If you did not request a password reset, please ignore this email or contact support if you have any questions.</p>

                    <p>Thanks,<br>Gain & Grain Team</p>
                </div>

                </body>
                </html>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Password reset email sent. If you don\'t receive it, check your spam.' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email: ', error);
        return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500});
    }
}
  
  export async function GET() {
    return NextResponse.json({ success: false, message: 'Method GET not allowed.' }, { status: 405 });
  }