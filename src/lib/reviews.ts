// Reviews will live in Postgres (Neon) with reviewer verification. The database is not
// connected yet, so every product has zero published reviews and the quality gate treats it that way.

export interface ReviewStats {
  count: number;
}

export function getReviewStats(_productId: string): ReviewStats {
  return { count: 0 };
}
