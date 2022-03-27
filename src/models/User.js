import { Model } from '@vuex-orm/core';

export default class User extends Model {
	// static entity = 'users';

	// You could use this instead
	static get entity() {
		return 'users';
	}

	static fields() {
		return {
			id: this.attr(null),
			email: this.attr(null)
		};
	}
}
