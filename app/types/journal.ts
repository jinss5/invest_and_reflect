export interface NewsItem {
  id: string;
  keyNews: string;
  marketReactionSummary: string;
}

export type MarketSentiment = "bullish" | "bearish" | "neutral";
export type ConfidenceLevel = "low" | "medium" | "high";
export type DecisionBasis = "logic" | "intuition" | "mixed";
export type ActionType = "buy" | "sell" | "hold";

export interface ActionDetail {
  id: string;
  type: ActionType;
  ticker: string;
  shares: string;
  pricePerUnit: string;
  confidenceLevel: ConfidenceLevel;
  decisionBasis: DecisionBasis;
}

export interface JournalEntry {
  date: string;
  summary: string;

  newsItems: NewsItem[];
  myInterpretation: string;

  marketSentiment: MarketSentiment;
  fearGreedIndex: number;
  marketNotes: string;

  actionDetails: ActionDetail[];
  reasoning: string;
}
