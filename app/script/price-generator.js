'use strict'

class PriceGenerator {
	constructor(subject, subscriptions, seeds) {
		this.subject = subject;
		this.subscriptions = subscriptions;

		var currencyPair = subject.match(/\/FX\/(.+)\/.+\/.+\//)[1];
		this.seed = seeds[currencyPair] || Math.random() + 1;
		seeds[currencyPair] = this.seed;
		this.previousValue = this.seed;
	};

	startUpdatingAtInterval(interval) {
		this.handle = window.setInterval(this.update.bind(this), interval);
	};

	terminate() {
		window.clearInterval(this.handle);
	};

	update() {
		var delta  = (this.previousValue > 100) ? Math.random() / 10 : Math.random() / 1000;
		var increment = (this.previousValue > 100) ? 0.02 : 0.0002;
		var newBid = this.previousValue + delta;
		var newAsk = newBid + increment;

		var subscriptions = this.subscriptions[this.subject];

		subscriptions.forEach(function(subscription) {
			subscription.listener.onRecordUpdate(subscription, {
				getFields: function() {
					return {
						"L1_AllInBidRate": newBid.toFixed(5).substring(0,7),
						"L1_AllInAskRate": newAsk.toFixed(5).substring(0,7)
					};
				}
			});
		});
	};
}

module.exports = PriceGenerator;