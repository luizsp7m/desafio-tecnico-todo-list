export const CARD_TAGS = {
  TASK: "TASK",
  BUG: "BUG",
  LOW_PRIORITY: "LOW_PRIORITY",
  HIGH_PRIORITY: "HIGH_PRIORITY",
  URGENT: "URGENT",
} as const;

export const CARD_TAG_COLORS = {
  [CARD_TAGS.TASK]: "#3498db",
  [CARD_TAGS.BUG]: "#f1c40f",
  [CARD_TAGS.LOW_PRIORITY]: "#2ecc71",
  [CARD_TAGS.HIGH_PRIORITY]: "#e67e22",
  [CARD_TAGS.URGENT]: "#c0392b",
};

export const CARD_TAG_LABELS = {
  [CARD_TAGS.TASK]: "Tarefa",
  [CARD_TAGS.BUG]: "Bug",
  [CARD_TAGS.LOW_PRIORITY]: "Baixa prioridade",
  [CARD_TAGS.HIGH_PRIORITY]: "Alta prioridade",
  [CARD_TAGS.URGENT]: "Urgente",
};

export const CARD_TAG_OPTIONS = [
  { value: CARD_TAGS.TASK, label: CARD_TAG_LABELS[CARD_TAGS.TASK] },
  { value: CARD_TAGS.BUG, label: CARD_TAG_LABELS[CARD_TAGS.BUG] },
  {
    value: CARD_TAGS.LOW_PRIORITY,
    label: CARD_TAG_LABELS[CARD_TAGS.LOW_PRIORITY],
  },
  {
    value: CARD_TAGS.HIGH_PRIORITY,
    label: CARD_TAG_LABELS[CARD_TAGS.HIGH_PRIORITY],
  },
  { value: CARD_TAGS.URGENT, label: CARD_TAG_LABELS[CARD_TAGS.URGENT] },
];
