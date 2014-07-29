var MessageService = function(updateRate) {
	var subscriptions = {};
	var priceGenerators = {};
	var updateRate = updateRate || 250;

	var removeSubscription = function(subject, subscription) {
		var subscriptionsForSubject = subscriptions[subject];

		if(subscriptionsForSubject) {
			for(var i=0, l=subscriptionsForSubject.length; i<l; ++i) {
				if(subscriptionsForSubject[i] === subscription) {
					subscriptionsForSubject.splice(i,1);
					subscription.unsubscribe = function() {};
					if(subscriptionsForSubject.length === 0) {
						window.clearInterval(priceGenerators[subject]);
						delete subscriptions[subject];
					}
					break;
				}
			}
		}
	};

	return {
		subscriptions: subscriptions,

		connect: function() {
			// NO-OP
		},

		subscribe: function(subject, listener) {
			var subscription = {
				unsubscribe: function() {
					removeSubscription(subject, this);
				},
				listener: listener
			};

			if(subscriptions[subject]) {
				subscriptions[subject].push(subscription);
			} else {
				subscriptions[subject] = [subscription];
				var priceGenerator = new PriceGenerator(subject, subscriptions);
				var handle = window.setInterval(priceGenerator.update.bind(priceGenerator), updateRate);
				priceGenerators[subject] = handle;
			}

			return subscription;
		}
	};
};

var PriceGenerator = function(subject, subscriptions, seed) {
	this.subject = subject;
	this.subscriptions = subscriptions;
	this.seed = seed || Math.random() + 1;
	this.previousValue = this.seed;
};

PriceGenerator.prototype.update = function() {

	var newBid = this.previousValue + (Math.random() / 10000);
	var newAsk = newBid + 0.0002;

	var subscriptions = this.subscriptions[this.subject];
	subscriptions.forEach(function(subscription) {
		subscription.listener.onRecordUpdate(subscription, {
			getFields: function() {
				return {
					"L1_AllInBidRate": newBid.toFixed(5),
					"L1_AllInAskRate": newAsk.toFixed(5)
				};
			}
		});
	});
};