import { user } from './user';

class message {
	public readonly time: Date;
	public text: string;
	public readonly user: string;

	constructor(time: Date, text: string, user: string) {
		this.time = time;
		this.text = text;
		this.user = user;
	}
}

class chat {
	private users: user[];
	private messages: message[];
	public readonly name: string;

	constructor(name: string) {
		this.name = name;
	}

	public addUser(newUser: user): void {
		if (this.users.includes(newUser))
			return;
		this.users.push(newUser);
	}
	public removeUser(rmUser: user): void {
		this.users.splice(this.users.indexOf(rmUser), 1);
	}
	public getUsers(): user[] {
		return this.users;
	}

	public send(msg: message): string[] {
		this.messages.push(msg);
		return this.users.map(x => x.id);
	}

	public getMessages(from: Date, to: Date = null): message[]{
		return this.messages.filter( x => (
			x.time.valueOf() > from.valueOf() && (!to || x.time.valueOf() < to.valueOf())) 
			);
	}
}

export { message, chat };