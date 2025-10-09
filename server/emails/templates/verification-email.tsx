// src/emails/templates/WelcomeEmail.tsx
import { Heading, Text, Hr } from "@react-email/components";
import { EmailLayout } from "../components/email-layout";
import { EmailButton } from "../components/email-button";

type VerificationEmailProps = {
  verificationUrl: string;
};

export const VerificationEmail = ({
  verificationUrl,
}: VerificationEmailProps) => {
  return (
    <EmailLayout>
      <Heading style={h1}>이메일 인증을 완료해주세요</Heading>

      <Text style={text}>아래 버튼을 클릭하여 이메일 인증을 완료하세요.</Text>

      <EmailButton href={verificationUrl}>인증 완료하기</EmailButton>

      <Hr style={hr} />

      <Text style={footer}>이 이메일은 자동으로 발송되었습니다.</Text>
    </EmailLayout>
  );
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
