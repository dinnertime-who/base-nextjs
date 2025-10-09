// src/emails/templates/components/EmailButton.tsx
import { Button } from "@react-email/components";

type EmailButtonProps = {
  href: string;
  children: React.ReactNode;
};

export const EmailButton = ({ href, children }: EmailButtonProps) => {
  return (
    <Button href={href} style={button}>
      {children}
    </Button>
  );
};

const button = {
  backgroundColor: "#5469d4",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};
