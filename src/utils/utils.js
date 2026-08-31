export function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// export function getOtpHtml(otp) {
//     return `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>OTP Verification</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             background-color: #f4f4f4;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100vh;
//         }
//         .container {
//             background-color: #fff;
//             padding: 20px;
//             border-radius: 5px;
//             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//             text-align: center;
//         }
//         .otp {
//             font-size: 24px;
//             font-weight: bold;
//             color: #333;
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <h2>Your OTP Code</h2>
//         <p class="otp">${otp}</p>
//         <p>Please use this code to verify your email address.</p>
//     </div>
// </body>
// </html>`;
// }



export function getOtpHtml(otp) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #f4f7fb;
    font-family: Arial, Helvetica, sans-serif;
">

    <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="background-color: #f4f7fb; padding: 40px 15px;">

        <tr>
            <td align="center">

                <!-- Main Container -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                    style="
                        max-width: 520px;
                        background-color: #ffffff;
                        border-radius: 16px;
                        overflow: hidden;
                        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
                    ">

                    <!-- Header -->
                    <tr>
                        <td align="center"
                            style="
                                padding: 32px 25px;
                                background-color: #111827;
                            ">

                            <div style="
                                display: inline-block;
                                width: 52px;
                                height: 52px;
                                line-height: 52px;
                                border-radius: 50%;
                                background-color: #2563eb;
                                color: #ffffff;
                                font-size: 24px;
                                font-weight: bold;
                            ">
                                ✓
                            </div>

                            <h1 style="
                                margin: 18px 0 0;
                                color: #ffffff;
                                font-size: 24px;
                                font-weight: 700;
                            ">
                                Verify Your Email
                            </h1>

                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 35px;">

                            <p style="
                                margin: 0 0 12px;
                                color: #111827;
                                font-size: 18px;
                                font-weight: 600;
                            ">
                                Hello 👋
                            </p>

                            <p style="
                                margin: 0 0 28px;
                                color: #6b7280;
                                font-size: 15px;
                                line-height: 1.7;
                            ">
                                We received a request to verify your email address.
                                Use the verification code below to continue.
                            </p>

                            <!-- OTP Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center"
                                        style="
                                            padding: 22px;
                                            background-color: #eff6ff;
                                            border: 1px solid #dbeafe;
                                            border-radius: 12px;
                                        ">

                                        <p style="
                                            margin: 0 0 8px;
                                            color: #64748b;
                                            font-size: 12px;
                                            font-weight: 600;
                                            letter-spacing: 1.5px;
                                            text-transform: uppercase;
                                        ">
                                            Your OTP
                                        </p>

                                        <div style="
                                            color: #2563eb;
                                            font-size: 36px;
                                            font-weight: 700;
                                            letter-spacing: 10px;
                                            padding-left: 10px;
                                        ">
                                            ${otp}
                                        </div>

                                    </td>
                                </tr>
                            </table>

                            <p style="
                                margin: 25px 0 0;
                                color: #6b7280;
                                font-size: 14px;
                                line-height: 1.6;
                                text-align: center;
                            ">
                                This code is valid for a limited time.
                                Please do not share it with anyone.
                            </p>

                            <div style="
                                height: 1px;
                                background-color: #e5e7eb;
                                margin: 30px 0;
                            "></div>

                            <p style="
                                margin: 0;
                                color: #9ca3af;
                                font-size: 12px;
                                line-height: 1.6;
                                text-align: center;
                            ">
                                If you didn't request this verification code,
                                you can safely ignore this email.
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center"
                            style="
                                padding: 22px 25px;
                                background-color: #f9fafb;
                                border-top: 1px solid #f0f0f0;
                            ">

                            <p style="
                                margin: 0;
                                color: #9ca3af;
                                font-size: 12px;
                            ">
                                © ${new Date().getFullYear()} Your App. All rights reserved.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>

    </table>

</body>
</html>
`
}
