/**
* @jsx React.DOM
*/

var CurrencyPairInput = React.createClass({

	getInitialState() {
		return {
			currencyPairInputVisible: false,
			currencyPairInputNeedsFocus: false
		};
	},

	/** Called after initial render */
	componentDidMount() {
		this.getCurrencyPairInputElement().on("keyup", function(event) {
			if(event.keyCode === 13) {
				this.getCurrencyPairInputElement().blur();
			}
		}.bind(this));
	},

	/** Called after each render */
	componentDidUpdate() {
		if(this.state.currencyPairInputNeedsFocus === true) {
			this.focusOnCurrencyPairInput();
		}
	},

	onClick() {
		this.setState({
			currencyPairInputVisible: true,
			currencyPairInputNeedsFocus: true
		});
	},

	onCurrencyPairChanged(event) {
		this.setState({currencyPairInputVisible: false});
		this.props.onCurrencyPairChanged(event.target.value);
	},

	render() {

		var currencyPairLabelStyle = {
			display: (this.state.currencyPairInputVisible) ? "none" : "inline"
		};

		var currencyPairInputStyle = {
			display: (this.state.currencyPairInputVisible) ? "inline" : "none"
		};

		return(
			<div className="Tile-headerBar--currencyPair">
				<span style={currencyPairLabelStyle} onClick={this.onClick}>{this.props.currencyPair}</span>
				<input type="text" style={currencyPairInputStyle} defaultValue={this.props.currencyPair} onBlur={this.onCurrencyPairChanged}/>
			</div>
		);
	},

	getCurrencyPairInputElement() {
		return $(this.getDOMNode().querySelector(".Tile-headerBar--currencyPair input"));
	},

	focusOnCurrencyPairInput() {
		var el = this.getCurrencyPairInputElement();

		el.val(this.props.currencyPair);
		el.selectAll();

		this.setState({currencyPairInputNeedsFocus: false});
	}
});