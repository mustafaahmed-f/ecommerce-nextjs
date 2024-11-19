//// used to get cookies on the client side:

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const { 0: key, 1: value } = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}
