export function getRandomRating(): number {
  let randomRating = Math.floor(Math.random() * 11);
  return randomRating / 2;
}
