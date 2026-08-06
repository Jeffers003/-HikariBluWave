export function calculateDiscount(precoAtual: number, precoAntigo: number) {
  if (!precoAntigo || precoAntigo <= precoAtual) {
    return 0;
  }

  const desconto = ((precoAntigo - precoAtual) / precoAntigo) * 100;

  return Math.round(desconto);
}
