export interface UserInterface {
	id?: string,
	name: string,
	nick: string,
	email: string,
	password: string,
}

export class User implements UserInterface {
	private constructor(
    private props: UserInterface,
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
	 static create(props: UserInterface, id?: string) {
    return new User(props, id);
  }

	public set name(name: string) {
		this.props.name = name;
	}

	public get name(): string {
		return this.props.name;
	}

	public set nick(nick: string) {
		this.props.nick = nick;
	}

	public get nick(): string {
		return this.props.nick;
	}

	public set email(email: string) {
		this.props.email = email;
	}

	public get email(): string {
		return this.props.email;
	}

	public set password(password: string) {
		this.props.password = password;
	}

	public get password(): string {
		return this.props.password;
	}
}
