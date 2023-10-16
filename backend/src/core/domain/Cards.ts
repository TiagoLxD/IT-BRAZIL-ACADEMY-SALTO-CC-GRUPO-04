export interface CardInterface {
	id?: string,
	value: string,
	suit: string,
}

export class Card implements CardInterface {
	private constructor(
    private props: CardInterface,
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
	 static create(props: CardInterface, id?: string) {
    return new Card(props, id);
  }

	public set value(value: string) {
		this.props.value = value;
	}

	public get value(): string {
		return this.props.value;
	}

	public set suit(suit: string) {
		this.props.suit = suit;
	}

	public get suit(): string {
		return this.props.suit;
	}
}
