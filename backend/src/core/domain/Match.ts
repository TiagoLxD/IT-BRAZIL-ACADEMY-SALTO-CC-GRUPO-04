import { User } from "@prisma/client"

export interface MatchInterface {
  id?: string
  name: string
  betValue: number
  user: User
}

export class Match implements MatchInterface {
	private constructor(
    private props: MatchInterface,
    public id?: string,
  ) {
    if (!props) {
      // @ts-expect-error used for ORM
      this.props = {};
      this.id = id;
      return;
    }

    this.props.id = id;
    this.props = props;
  }
	 static create(props: MatchInterface, id?: string) {
    return new Match(props, id);
  }

	public set name(name: string) {
		this.props.name = name;
	}

	public get name(): string {
		return this.props.name;
	}

	public set betValue(betValue: number) {
		this.props.betValue = betValue;
	}

	public get betValue(): number {
		return this.props.betValue;
	}

	public set user(user: User) {
		this.props.user = user;
	}

	public get user(): User {
		return this.props.user;
	}
}
