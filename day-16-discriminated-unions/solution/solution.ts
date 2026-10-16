export type Payment =
  | { type: 'card'; cardNumber: string; cvv: string }
  | { type: 'crypto'; walletAddress: string; token: string }
  | { type: 'bank'; accountNumber: string; routingNumber: string };

export function processPayment(payment: Payment): string {
  switch (payment.type) {
    case 'card':
      return `Charged card ending in ${payment.cardNumber.slice(-4)}`;
    case 'crypto':
      return `Sent ${payment.token} to wallet ${payment.walletAddress}`;
    case 'bank':
      return `Debited bank account ${payment.accountNumber}`;
    default: {
      const _exhaustiveCheck: never = payment;
      throw new Error(`Unhandled payment: ${_exhaustiveCheck}`);
    }
  }
}
