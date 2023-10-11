export interface HashComparer {
  compare(plaitext: string, hash: string): Promise<boolean>;
}
