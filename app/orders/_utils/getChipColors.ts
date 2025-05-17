type statusColors = {
  pending: string;
  confirmed: string;
  shipped: string;
  delivered: string;
  returned: string;
  cancelled: string;
};

const colorMap = {
  pending: { bg: "#FEF3C7", border: "#FCD34D", text: "#92400E" }, // yellow
  confirmed: { bg: "#DBEAFE", border: "#3B82F6", text: "#1E3A8A" }, // blue
  shipped: { bg: "#EDE9FE", border: "#8B5CF6", text: "#4C1D95" }, // purple
  delivered: { bg: "#D1FAE5", border: "#10B981", text: "#065F46" }, // green
  returned: { bg: "#FFEDD5", border: "#FB923C", text: "#7C2D12" }, // orange
  cancelled: { bg: "#FEE2E2", border: "#EF4444", text: "#7F1D1D" }, // red
};

export const getChipColors = (status: keyof statusColors) => {
  return colorMap[status];
};
