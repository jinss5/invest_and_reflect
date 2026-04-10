import type {
  MarketSentiment,
  ActionType,
  ConfidenceLevel,
  DecisionBasis,
} from "@/app/types/journal";

export const DEFAULT_MARKET_SENTIMENT: MarketSentiment = "neutral";
export const DEFAULT_FEAR_GREED_INDEX = 50;
export const DEFAULT_ACTION_TYPE: ActionType = "hold";
export const DEFAULT_CONFIDENCE_LEVEL: ConfidenceLevel = "medium";
export const DEFAULT_DECISION_BASIS: DecisionBasis = "mixed";
