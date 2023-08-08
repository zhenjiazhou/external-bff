export interface ProductIdToSKUId {
  data: Record<string, number[]>;
  range: Range;
}

interface Range {
  total: number;
  from: number;
  to: number;
}
