"use strict"

var React = require('react/addons');
var CurrencyPairInput = require('../ui/currency-pair-input.jsx');

var HeaderRow = React.createClass({

	render() {

		return(
			<div className="Tile-headerBar">
				<CurrencyPairInput currencyPair={this.props.currencyPair} onCurrencyPairChanged={this.props.onCurrencyPairChanged}/>
				<div className="Tile-headerBar--closeButton Tile-btn">X</div>
				<div className="Tile-headerBar--menuButton Tile-btn">m</div>
			</div>
		);
	}
});

module.exports = HeaderRow;