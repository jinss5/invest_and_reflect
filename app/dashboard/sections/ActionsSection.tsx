"use client";

import type { ActionDetail, ActionType, ConfidenceLevel, DecisionBasis } from "@/app/types/journal";
import SegmentedControl from "@/app/components/SegmentedControl";
import { INPUT_CLASS, Badge, TextValue } from "../components";

const CONFIDENCE_OPTIONS = [
  { value: "low" as const, label: "Low" },
  { value: "medium" as const, label: "Medium" },
  { value: "high" as const, label: "High" },
];

const BASIS_OPTIONS = [
  { value: "logic" as const, label: "Logic-Based" },
  { value: "intuition" as const, label: "Intuition-Based" },
  { value: "mixed" as const, label: "Mixed" },
];

const CONFIDENCE_LABELS: Record<ConfidenceLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};
const BASIS_LABELS: Record<DecisionBasis, string> = {
  logic: "Logic-Based",
  intuition: "Intuition-Based",
  mixed: "Mixed",
};

type ActionField =
  | "type"
  | "ticker"
  | "shares"
  | "pricePerUnit"
  | "confidenceLevel"
  | "decisionBasis";

interface ActionsSectionProps {
  mode: "view" | "edit" | "create";
  actionDetails: ActionDetail[];
  reasoning: string;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: ActionField, value: string) => void;
  onReasoningChange: (value: string) => void;
}

function ActionCardView({ detail, index }: { detail: ActionDetail; index: number }) {
  return (
    <div className="border border-gray-100 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#6b7280]">Action #{index + 1}</span>
        <Badge
          label={detail.type.charAt(0).toUpperCase() + detail.type.slice(1)}
          variant={detail.type as ActionType}
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-[#6b7280] mb-0.5">Ticker</label>
          <p className="text-sm font-medium text-[#0d1117]">{detail.ticker || "—"}</p>
        </div>
        <div>
          <label className="block text-xs text-[#6b7280] mb-0.5">Shares</label>
          <p className="text-sm text-[#0d1117]">{detail.shares || "—"}</p>
        </div>
        <div>
          <label className="block text-xs text-[#6b7280] mb-0.5">Price / Unit</label>
          <p className="text-sm text-[#0d1117]">{detail.pricePerUnit || "—"}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <label className="block text-xs text-[#6b7280] mb-1">Confidence</label>
          <Badge label={CONFIDENCE_LABELS[detail.confidenceLevel]} />
        </div>
        <div>
          <label className="block text-xs text-[#6b7280] mb-1">Decision Basis</label>
          <Badge label={BASIS_LABELS[detail.decisionBasis]} />
        </div>
      </div>
    </div>
  );
}

function ActionCardEdit({
  detail,
  index,
  canRemove,
  onRemove,
  onUpdate,
}: {
  detail: ActionDetail;
  index: number;
  canRemove: boolean;
  onRemove: () => void;
  onUpdate: (field: ActionField, value: string) => void;
}) {
  return (
    <div className="space-y-3 border border-gray-100 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#6b7280]">Action #{index + 1}</span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs text-red-400 hover:text-red-600 transition-colors"
          >
            Remove
          </button>
        )}
      </div>
      <select
        value={detail.type}
        onChange={(e) => onUpdate("type", e.target.value)}
        className={INPUT_CLASS}
      >
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
        <option value="hold">Hold</option>
      </select>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-[#6b7280] mb-1">Ticker</label>
          <input
            type="text"
            value={detail.ticker}
            onChange={(e) => onUpdate("ticker", e.target.value)}
            placeholder="e.g., AAPL"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className="block text-xs text-[#6b7280] mb-1">Shares</label>
          <input
            type="text"
            value={detail.shares}
            onChange={(e) => onUpdate("shares", e.target.value)}
            placeholder="0"
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className="block text-xs text-[#6b7280] mb-1">Price / Unit</label>
          <input
            type="text"
            value={detail.pricePerUnit}
            onChange={(e) => onUpdate("pricePerUnit", e.target.value)}
            placeholder="0.00"
            className={INPUT_CLASS}
          />
        </div>
      </div>
      <SegmentedControl
        label="Confidence Level"
        options={CONFIDENCE_OPTIONS}
        value={detail.confidenceLevel}
        onChange={(v) => onUpdate("confidenceLevel", v)}
      />
      <SegmentedControl
        label="Decision Basis"
        options={BASIS_OPTIONS}
        value={detail.decisionBasis}
        onChange={(v) => onUpdate("decisionBasis", v)}
      />
    </div>
  );
}

export default function ActionsSection({
  mode,
  actionDetails,
  reasoning,
  onAdd,
  onRemove,
  onUpdate,
  onReasoningChange,
}: ActionsSectionProps) {
  const isView = mode === "view";

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
      <h2 className="text-lg font-semibold text-[#0d1117]">Actions</h2>

      {actionDetails.map((detail, index) =>
        isView ? (
          <ActionCardView key={detail.id} detail={detail} index={index} />
        ) : (
          <ActionCardEdit
            key={detail.id}
            detail={detail}
            index={index}
            canRemove={actionDetails.length > 1}
            onRemove={() => onRemove(detail.id)}
            onUpdate={(field, value) => onUpdate(detail.id, field, value)}
          />
        )
      )}

      {!isView && (
        <button
          type="button"
          onClick={onAdd}
          className="text-xs font-medium text-[#6b7280] hover:text-[#0d1117] transition-colors"
        >
          + Add Action
        </button>
      )}

      <div>
        <label className="block text-sm font-medium text-[#6b7280] mb-1">
          Reasoning Behind Actions
        </label>
        {isView ? (
          <TextValue value={reasoning} />
        ) : (
          <textarea
            value={reasoning}
            onChange={(e) => onReasoningChange(e.target.value)}
            placeholder="Why did I take these actions today?"
            rows={3}
            className={INPUT_CLASS}
          />
        )}
      </div>
    </section>
  );
}
