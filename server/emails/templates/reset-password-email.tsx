// src/emails/templates/ResetPasswordEmail.tsx
import { Heading, Text, Hr } from "@react-email/components";
import { EmailLayout } from "../components/email-layout";
import { EmailButton } from "../components/email-button";

type ResetPasswordEmailProps = {
  resetUrl: string;
};

export const ResetPasswordEmail = ({ resetUrl }: ResetPasswordEmailProps) => {
  return (
    <EmailLayout>
      <Heading style={h1}>비밀번호 재설정</Heading>

      <Text style={text}>아래 버튼을 클릭하여 비밀번호 재설정하세요.</Text>

      <EmailButton href={resetUrl}>비밀번호 재설정하기</EmailButton>

      <Hr style={hr} />

      <Text style={footer}>
        본인이 요청하지 않았다면 이 이메일을 무시하세요. 링크는 1시간 후
        만료됩니다.
      </Text>
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

const codeStyle = {
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  border: "1px solid #eee",
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  letterSpacing: "4px",
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
