import { Match } from "../domain/Match";

export interface MatchRepositoryInterface {
	create(data: Match): Promise<void>
}
