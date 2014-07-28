/**
* @jsx React.DOM
*/

var AmountRow = React.createClass({

	getInitialState() {
		return {
			currencyPair: this.props.currencyPair,
			dealtCurrency: this.props.dealtCurrency,
			amount: this.props.amount,
		};
	},

	onAmountChanged(event) {
		var newAmount = event.target.value;
		this.setState({amount: newAmount});
		this.props.onAmountChanged(newAmount);
	},

	onDealtCurrencyChanged(event) {
		var newDealtCurrency = this.state.currencyPair.replace(this.state.dealtCurrency, '');
		this.setState({dealtCurrency: newDealtCurrency});
		this.props.onDealtCurrencyChanged(newDealtCurrency);
	},

	render() {

		return(
			<div className="Tile-amountRow">
				<input type="text" className="Tile-amountRow--amountInput" value={this.state.amount} onChange={this.onAmountChanged}></input>
				<div className="Tile-amountRow--gfa">{this.props.gfa}</div>
				<div className="Tile-amountRow--dealtCurrencyBtn Tile-btn" onClick={this.onDealtCurrencyChanged}>{this.state.dealtCurrency}</div>
			</div>
		);
	}
});