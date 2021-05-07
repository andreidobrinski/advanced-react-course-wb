import { createTransport } from "nodemailer";

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
});

function makeEmail(text: string): string {
  return `
    <div
      style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px;
      "
    >
      <h2>Hello there!</h2>
      <p>Your password reset token is here</p>
      <p>${text}</p>
      <p>Thanks</p>
    </div>
  `;
}

interface MailResponse {
  accepted?: (string)[] | null;
  rejected?: (null)[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}
export interface Envelope {
  from: string;
  to?: (string)[] | null;
}

export async function sendPasswordResetEmail(resetToken: string, to: string): Promise<void> {
  const info = await transport.sendMail({
    to,
    from: 'test@test.com',
    subject: 'Your password reset token',
    html: makeEmail(`
      <a href="${process.env.FRONTEND_URL}/rest?token=${resetToken}">
        Click here to reset
      </>
    `)
  }) as MailResponse
}