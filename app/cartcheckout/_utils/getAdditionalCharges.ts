export function getAdditionalCharges(...additionalCharges: number[]) {
  return additionalCharges.reduce((total, charge) => total + charge, 0);
}
