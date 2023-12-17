export function splitToNChunks(array: any[], n: number): any[] {
  const copiedArray = [...array]; // Kopie des Arrays erstellen
  let result = [];

  for (let i = n; i > 0; i--) {
    result.push(copiedArray.splice(0, Math.ceil(copiedArray.length / i)));
  }

  return result;
}
