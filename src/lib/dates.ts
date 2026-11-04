const DAY_MS = 24 * 60 * 60 * 1000;

/** Today's date as YYYY-MM-DD in UTC. Pages are static, so this is the build date. */
export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function daysBetween(fromIso: string, toIso: string): number {
  return Math.floor((Date.parse(`${toIso}T00:00:00Z`) - Date.parse(`${fromIso}T00:00:00Z`)) / DAY_MS);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatUsd(amount: number): string {
  return formatMoney(amount, 'USD');
}

/** "0.7% of billing volume" or "5% + $0.50 per transaction". */
export function formatVolumeFee(fee: { percent: number; fixedUsd?: number; basis: string }): string {
  return `${fee.percent}%${fee.fixedUsd ? ` + ${formatUsd(fee.fixedUsd)}` : ''} ${fee.basis}`;
}

/** For the few vendors that publish no USD price. Shown as listed, never converted. */
export function formatMoney(amount: number, currency: string): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  });
}
