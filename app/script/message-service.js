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

	removeSubscription(subject, subscription) {
		var subscriptionsForSubject = this.subscriptions[subject];

		if(subscriptionsForSubject) {
			for(var i=0, l=subscriptionsForSubject.length; i<l; ++i) {
				if(subscriptionsForSubject[i] === subscription) {
					subscriptionsForSubject.splice(i,1);
					subscription.unsubscribe = function() {};
					break;
				}
			}

			if(subscriptionsForSubject.length === 0) {
				window.clearInterval(this.priceGenerators[subject]);
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
		var self = this;
		var subscription = {
			unsubscribe: function() {
				self.removeSubscription(subject, this);
			},
			listener: listener
		};

		if(this.subscriptions[subject]) {
			this.subscriptions[subject].push(subscription);
		} else {
			this.subscriptions[subject] = [subscription];
			var priceGenerator = new PriceGenerator(subject, this.subscriptions, this.seeds);
			var handle = window.setInterval(priceGenerator.update.bind(priceGenerator), this.updateRate);
			this.priceGenerators[subject] = handle;
		}

		return subscription;
	}
};

var PriceGenerator = function(subject, subscriptions, seeds) {
	this.subject = subject;
	this.subscriptions = subscriptions;

	var currencyPair = subject.match(/\/FX\/(.+)\/.+\/.+\//)[1];
	this.seed = seeds[currencyPair] || Math.random() + 1;
	seeds[currencyPair] = this.seed;
	this.previousValue = this.seed;
};

PriceGenerator.prototype.update = function() {

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

module.exports = MessageService;