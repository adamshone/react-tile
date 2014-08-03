'use strict'

class Subscription {
	constructor(subject, listener, parentMessageService) {
		this.subject = subject;
		this.listener = listener;
		this.parentMessageService = parentMessageService;
	};

	getSubject() {
		return this.subject;
	}

	unsubscribe() {
		this.parentMessageService.removeSubscription(this);
		this.unsubscribe = function() {};
	};
}

module.exports = Subscription;