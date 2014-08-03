'use strict'

var Subscription = require('./subscription');
var PriceGenerator = require('./price-generator');

class MessageService {
	constructor(updateRate) {
		this.subscriptions = {};
		this.priceGenerators = {};
		this.updateRate = updateRate || 250;

		this.seeds = {
			"USDJPY": 102.090,
			"USDGBP": 0.59630,
			"USDCAD": 1.09543,
			"USDZAR": 10.62352,
			"USDEUR": 0.75234,
			"EURGBP": 0.79112,
			"GBPEUR": 1.26449,
			"USDAUD": 1.07943,
			"EURCHF": 1.22942,
			"GBPUSD": 1.69328
		}
	}

	removeSubscription(subscription) {
		var subject = subscription.getSubject();
		var subscriptionsForSubject = this.subscriptions[subject];

		if(subscriptionsForSubject) {
			for(var i=0, l=subscriptionsForSubject.length; i<l; ++i) {
				if(subscriptionsForSubject[i] === subscription) {
					subscriptionsForSubject.splice(i,1);
					break;
				}
			}

			if(subscriptionsForSubject.length === 0) {
				this.priceGenerators[subject].terminate();
				delete this.subscriptions[subject];
				delete this.priceGenerators[subject];
			}
		}
	}

	getSupportedCurrencyPairs() {
		return Object.keys(this.seeds);
	};

	connect() {
		// NO-OP
	};

	subscribe(subject, listener) {
		var subscription = new Subscription(subject, listener, this);

		if(this.subscriptions[subject]) {
			this.subscriptions[subject].push(subscription);
		} else {
			this.subscriptions[subject] = [subscription];
			var priceGenerator = new PriceGenerator(subject, this.subscriptions, this.seeds);
			this.priceGenerators[subject] = priceGenerator;
			priceGenerator.startUpdatingAtInterval(this.updateRate);
		}

		return subscription;
	}
};

module.exports = MessageService;