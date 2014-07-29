/**
* @jsx React.DOM
*/

var Tile = React.createClass({

	getInitialState() {

		var currencyPair = 'USDJPY';

		return {
			currencyPair: currencyPair,
			dealtCurrency: currencyPair.substring(0,3),
			amount: '10000',
			settlementDate: '30/07/2014',
			tenor: 'SPOT',
		};
	},

	onAmountChanged(newAmount) {
		if(newAmount === '' || (!isNaN(parseFloat(newAmount)) && isFinite(newAmount))) {
			this.setState({amount: newAmount});
		}
	},

	onCurrencyPairChanged(currencyPair) {
		if(currencyPair.match(/\w{6}/)) {
			currencyPair = currencyPair.toUpperCase();
			this.setState({
				currencyPair: currencyPair,
				dealtCurrency: currencyPair.substring(0,3)
			});	
		}
	},

	onDealtCurrencyChanged(newDealtCurrency) {
		this.setState({dealtCurrency: newDealtCurrency});
	},

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
		      <ButtonRow bidAllIn={this.props.bidAllIn} askAllIn={this.props.askAllIn} onExecuteButtonClicked={this.onExecuteButtonClicked}/>
		    </div>
    	);
	}
});