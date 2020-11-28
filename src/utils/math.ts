/** Returns positive modulo. Example: -1 % 20 = 19 and not -1 */
export function mod(x: number, y: number) {
  return ((x % y) + y) % y;
}
