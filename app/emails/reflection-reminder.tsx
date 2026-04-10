import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Link,
  Button,
  Hr,
  Heading,
} from "@react-email/components";

type NewsItem = {
  key_news: string;
  market_reaction_summary: string;
};

type Action = {
  action_type: string;
  ticker: string;
  shares: number | null;
  price_per_unit: number | null;
  confidence_level: string;
};

export type ReminderEmailProps = {
  displayName: string;
  entryDate: string;
  reminderType: "1_week" | "1_month" | "1_year";
  summary: string;
  reasoning: string;
  marketSentiment: string;
  fearGreedIndex: number | null;
  newsItems: NewsItem[];
  actions: Action[];
  appUrl: string;
};

const INTERVAL_LABELS: Record<string, string> = {
  "1_week": "1 week",
  "1_month": "1 month",
  "1_year": "1 year",
};

export default function ReflectionReminderEmail({
  displayName,
  entryDate,
  reminderType,
  summary,
  reasoning,
  marketSentiment,
  fearGreedIndex,
  newsItems,
  actions,
  appUrl,
}: ReminderEmailProps) {
  const intervalLabel = INTERVAL_LABELS[reminderType];
  const previewText = `It's been ${intervalLabel} since your reflection on ${entryDate}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>Your reflection from {entryDate}</Heading>
          <Text style={subheading}>
            Hi {displayName || "there"}, it&apos;s been {intervalLabel} since you wrote this entry.
            How have things played out?
          </Text>

          <Hr style={hr} />

          <Section>
            <Text style={sectionTitle}>Summary</Text>
            <Text style={paragraph}>{summary}</Text>
          </Section>

          {newsItems.length > 0 && (
            <Section>
              <Text style={sectionTitle}>Key News That Day</Text>
              {newsItems.map((item, i) => (
                <Text key={i} style={paragraph}>
                  <strong>{item.key_news}</strong>
                  {item.market_reaction_summary && <> — {item.market_reaction_summary}</>}
                </Text>
              ))}
            </Section>
          )}

          {actions.length > 0 && (
            <Section>
              <Text style={sectionTitle}>Actions You Took</Text>
              {actions.map((action, i) => (
                <Text key={i} style={paragraph}>
                  <strong>
                    {action.action_type.toUpperCase()} {action.ticker}
                  </strong>
                  {action.shares != null && <> — {action.shares} shares</>}
                  {action.price_per_unit != null && <> @ ${action.price_per_unit}</>}
                  {action.confidence_level && <> (confidence: {action.confidence_level})</>}
                </Text>
              ))}
            </Section>
          )}

          {reasoning && (
            <Section>
              <Text style={sectionTitle}>Your Reasoning</Text>
              <Text style={paragraph}>{reasoning}</Text>
            </Section>
          )}

          <Section>
            <Text style={metaText}>
              Sentiment: {marketSentiment || "—"}
              {fearGreedIndex != null && <> · Fear & Greed: {fearGreedIndex}</>}
            </Text>
          </Section>

          <Section style={ctaSection}>
            <Button style={button} href={`${appUrl}/dashboard?date=${entryDate}`}>
              Review this entry
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            You&apos;re receiving this because you enabled reminders on{" "}
            <Link href={appUrl} style={link}>
              Invest &amp; Reflect
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#f6f6f6",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "40px auto" as const,
  padding: "32px",
  maxWidth: "560px",
  borderRadius: "8px",
};

const heading = {
  fontSize: "20px",
  fontWeight: "600" as const,
  color: "#0d1117",
  margin: "0 0 8px" as const,
};

const subheading = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "0 0 24px" as const,
  lineHeight: "1.5",
};

const sectionTitle = {
  fontSize: "13px",
  fontWeight: "600" as const,
  color: "#0d1117",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "20px 0 8px" as const,
};

const paragraph = {
  fontSize: "14px",
  color: "#374151",
  lineHeight: "1.6",
  margin: "0 0 8px" as const,
};

const metaText = {
  fontSize: "13px",
  color: "#9ca3af",
  margin: "16px 0" as const,
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "24px 0" as const,
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "24px 0" as const,
};

const button = {
  backgroundColor: "#0d1117",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "500" as const,
  padding: "10px 24px",
  borderRadius: "6px",
  textDecoration: "none",
};

const link = {
  color: "#0d1117",
  textDecoration: "underline",
};

const footer = {
  fontSize: "12px",
  color: "#9ca3af",
  textAlign: "center" as const,
};
