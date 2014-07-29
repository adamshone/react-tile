/**
* @jsx React.DOM
*/

var Tile = React.createClass({

	getInitialState() {

		return {
			currencyPair: this.props.currencyPair,
			dealtCurrency: this.props.currencyPair.substring(0,3),
			amount: '10000',
			settlementDate: '30/07/2014',
			tenor: 'SPOT',
			bid: "-.-----",
			ask: "-.-----"
		};
	},

	/** Called once by React after the component first renders */
	componentDidMount() {
		this.subscription = this.props.messageService.subscribe(this.getSubject(), this);
	},

	/** Called by the message service when there is a new price */
	onRecordUpdate(subscription, event) {
		this.setState({
			bid: event.getFields()["L1_AllInBidRate"],
			ask: event.getFields()["L1_AllInAskRate"]
		});
	},

	/** Called by subcomponent */
	onAmountChanged(newAmount) {
		if(newAmount === "" || (!isNaN(parseFloat(newAmount)) && isFinite(newAmount))) {
			this.setState({amount: newAmount});
		}

		if(newAmount === "") {
			this.setState({
				bid: "-.-----",
				ask: "-.-----",
			});
		}

		this.resubscribe();
	},

	/** Called by subcomponent */
	onCurrencyPairChanged(currencyPair) {
		if(currencyPair.match(/\w{6}/)) {
			currencyPair = currencyPair.toUpperCase();
			this.setState({
				currencyPair: currencyPair,
				dealtCurrency: currencyPair.substring(0,3)
			});
			this.resubscribe();
		}
	},

	/** Called by subcomponent */
	onDealtCurrencyChanged(newDealtCurrency) {
		this.setState({dealtCurrency: newDealtCurrency});
		this.resubscribe();
	},

	/** Called by subcomponent */
	onExecuteButtonClicked(payload) {
		console.log("trade button clicked", payload);
	},

	render() {

		var state = this.state;

  		return(
		    <div className="Tile">
		      <HeaderRow currencyPair={state.currencyPair} onCurrencyPairChanged={this.onCurrencyPairChanged} />
		      <AmountRow currencyPair={state.currencyPair} amount={state.amount} dealtCurrency={state.dealtCurrency} gfa="10m" onAmountChanged={this.onAmountChanged} onDealtCurrencyChanged={this.onDealtCurrencyChanged}/>
		      <DateRow settlementDate={state.settlementDate} tenor={state.tenor}/>
		      <ButtonLabelRow dealtCurrency={state.dealtCurrency} />
		      <ButtonRow bid={this.state.bid} ask={this.state.ask} onExecuteButtonClicked={this.onExecuteButtonClicked}/>
		    </div>
    	);
	},

	resubscribe() {
		window.setTimeout(function() {
			this.subscription.unsubscribe();
			if(this.state.amount !== '') {
				this.subscription = this.props.messageService.subscribe(this.getSubject(), this);
			}
		}.bind(this), 0);
	},

	getSubject() {
		return "/FX/" + this.state.currencyPair + "/" + this.state.tenor + "/" + this.state.dealtCurrency + "/" + this.state.amount;
	}
});