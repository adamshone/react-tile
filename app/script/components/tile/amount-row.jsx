"use strict"

var React = require('react/addons');

var AmountRow = React.createClass({

	onAmountChanged(event) {
		var newAmount = event.target.value;
		this.props.onAmountChanged(newAmount);
	},

	onDealtCurrencyChanged(event) {
		var newDealtCurrency = this.props.currencyPair.replace(this.props.dealtCurrency, '');
		this.setState({dealtCurrency: newDealtCurrency});
		this.props.onDealtCurrencyChanged(newDealtCurrency);
	},

	render() {

		return(
			<div className="Tile-amountRow">
				<input type="text" className="Tile-amountRow--amountInput" value={this.props.amount} onChange={this.onAmountChanged}></input>
				<div className="Tile-amountRow--gfa">{this.props.gfa}</div>
				<div className="Tile-amountRow--dealtCurrencyBtn Tile-btn" onClick={this.onDealtCurrencyChanged}>{this.props.dealtCurrency}</div>
			</div>
		);
	}
});

module.exports = AmountRow;