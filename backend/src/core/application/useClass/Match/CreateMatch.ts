import { Match } from "../../../../core/domain/Match";
import { MatchRepositoryInterface } from "../../../../core/repositories/MatchRepository";

export class CreateMatch {
	constructor(
		private readonly matchRepository: MatchRepositoryInterface,
	) { }

	async execute(data: Match): Promise<void> {
		await this.matchRepository.create(data);
	}
}
