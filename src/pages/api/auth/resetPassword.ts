// import { NextApiRequest, NextApiResponse } from "next";
// import { sendPasswordResetEmail } from "../../../utils/emailService";
// import { prisma } from "../../../lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     const { email } = req.body;

//     // Find user by email
//     const user = await prisma.user.findUnique({ where: { email } });

//     if (!user) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email not found" });
//     }

//     // Create a unique token (JWT or UUID) and save to DB
//     const token = "generated_token_here"; // Implement token generation logic
//     await prisma.passwordResetToken.create({
//       data: {
//         token,
//         userId: user.id,
//         expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiry
//       },
//     });

//     // Send email with reset link
//     const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
//     await sendPasswordResetEmail(user.email, resetUrl);

//     res.json({ success: true });
//   } else {
//     res.status(405).json({ success: false, message: "Method not allowed" });
//   }
// }
