import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Email } from "@/types/email.type";

export const EmailAdmin = ({ name, email, message }: Email) => {
  return (
    <Html>
      <Section>
        <Text style={heading}>Hi Domsat!</Text>
        <Text style={text}>Email: {email}</Text>
        <Text style={text}>Name: {name}</Text>
        <Text style={text}>Message: {message}</Text>
      </Section>
    </Html>
  );
}

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const text = {
  fontSize: "16px",
  lineHeight: "0.5",
  color: "#484848",
};
