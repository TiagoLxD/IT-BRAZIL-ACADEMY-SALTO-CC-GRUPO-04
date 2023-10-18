import { Match } from "../domain/Match";

export type MatchList  = {
	id: string,
  betValue: number,
  name: string,
	user: {
    id: string,
  },
}

export interface MatchRepositoryInterface {
	create(data: Match): Promise<void>
	list(): Promise<MatchList[]>
}
