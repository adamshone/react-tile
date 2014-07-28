/**
* @jsx React.DOM
*/

var Tile = React.createClass({

	getInitialState() {
		return {
			currencyPair: 'USDJPY',
			dealtCurrency: 'USD',
			amount: 100,
			settlementDate: '30/07/2014',
			tenor: 'SPOT',
		};
	},

	dealtCurrencyButtonClicked(event) {
		var newDealtCurrency = this.state.currencyPair.replace(this.state.dealtCurrency, '');
		this.setState({
			dealtCurrency: newDealtCurrency
		});
	},

	render() {

		var baseCurrency = this.state.currencyPair.substring(0,3);
  		var settlementDateText = `${this.state.settlementDate} (${this.state.tenor})`;

  		return(
		    <div className="Tile">
		      <div className="Tile-headerBar">
		        <div className="Tile-headerBar--currencyPair">{this.state.currencyPair}</div>
		        <div className="Tile-headerBar--closeButton Tile-btn">X</div>
		        <div className="Tile-headerBar--menuButton Tile-btn">m</div>
		      </div>
		      <div className="Tile-amountRow">
		        <input type="text" className="Tile-amountRow--amountInput" defaultValue={this.state.amount}></input>
		        <div className="Tile-amountRow--gfa">10m</div>
		        <div className="Tile-amountRow--dealtCurrencyBtn Tile-btn" onClick={this.dealtCurrencyButtonClicked}>{this.state.dealtCurrency}</div>
		      </div>
		      <div className="Tile-dateRow">
		        <input type="text" className="Tile-dateRow--dateInput" defaultValue={settlementDateText}></input>
		        <div className="Tile-dateRow--calendarBtn Tile-btn">C</div>
		      </div>
		      <ButtonLabelRow dealtCurrency={this.state.dealtCurrency} />
		      <ButtonRow bidAllIn={this.props.bidAllIn} askAllIn={this.props.askAllIn} />
		    </div>
    	);
	}
});