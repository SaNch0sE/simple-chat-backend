import * as crypto from 'crypto';
export class user {
	public readonly id: string;
	public name: string;
	public readonly pass: string;

	public constructor(name: string, pass: string) {
		this.name = name;
		this.pass = pass;
		this.id = crypto.createHash('sha256').update(name).digest('hex');
	}
}
export interface IUser {
	readonly id: string;
	name: string;
	readonly pass: string;
}