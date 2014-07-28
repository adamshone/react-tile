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

  		var bidBigFig = this.props.bidAllIn.substring(0,4);
  		var bidPips = this.props.bidAllIn.substring(4,6);
  		var bidPipette = this.props.bidAllIn.substring(6);

		var askBigFig = this.props.askAllIn.substring(0,4);
  		var askPips = this.props.askAllIn.substring(4,6);
  		var askPipette = this.props.askAllIn.substring(6);

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
		      <div className="Tile-btnLabelRow">
		        <div className="Tile-btnLabelRow--leftBtnLabel">SELL {this.state.dealtCurrency}</div>
		        <div className="Tile-btnLabelRow--rightBtnLabel">BUY {this.state.dealtCurrency}</div>
		      </div>
		      <div className="Tile-btnRow">
		        <div className="Tile-btnRow--btn Tile-btnRow--btnLeft Tile-btn">
		          <small>{bidBigFig}</small>
		          <em>{bidPips}</em>
		          <span>{bidPipette}</span>
		        </div>
		        <div className="Tile-btnRow--btn Tile-btnRow--btnRight Tile-btn">
		          <small>{askBigFig}</small>
		          <em>{askPips}</em>
		          <span>{askPipette}</span>
		        </div>
		      </div>
		    </div>
    	);
	}
});