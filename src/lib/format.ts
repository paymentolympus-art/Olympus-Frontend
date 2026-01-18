// criar função para formatar numero para real
export function formatNumber(number: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
}

export function formatNumberToReal(number: number | string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(number));
}

export function formatNumberToRealWithoutCurrency(number: number | string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(Number(number));
}

export function formatCurrency(number: number | string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(number));
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export const format = {
  number: formatNumber,
  numberToReal: formatNumberToReal,
  numberToRealWithoutCurrency: formatNumberToRealWithoutCurrency,
  currency: formatCurrency,
  date: formatDate,
};
