import { Match } from "@/core/domain/Match";
import { MatchList, MatchRepositoryInterface } from "@/core/repositories/MatchRepository";

export class InMemoryMatchRepository implements MatchRepositoryInterface {
	items: Match[] = [];
	create(data: Match): Promise<void> {
		this.items.push(data);
		return Promise.resolve();
	}

	list(): Promise<MatchList[]> {
		return Promise.resolve(this.items as MatchList[]);
	}
}
