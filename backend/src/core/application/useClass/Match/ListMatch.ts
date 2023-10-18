import { MatchList, MatchRepositoryInterface } from "../../../../core/repositories/MatchRepository";

export class ListMatch {
	constructor(
		private readonly matchRepository: MatchRepositoryInterface,
	) { }

	async execute(): Promise<MatchList[]> {
		return this.matchRepository.list();
	}
}
