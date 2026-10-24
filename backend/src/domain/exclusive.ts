export type SimilarityDecision = {
  blocked: boolean;
  reason: string;
};

export function evaluateExclusiveSimilarity(score: number, threshold: number): SimilarityDecision {
  if (score < 0 || score > 1 || threshold < 0 || threshold > 1) throw new Error('Similarity values must be between 0 and 1');
  if (score >= threshold) return { blocked: true, reason: 'Protected musical identity threshold exceeded' };
  return { blocked: false, reason: 'Below protected similarity threshold' };
}
