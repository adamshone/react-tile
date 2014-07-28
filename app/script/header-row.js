/**
* @jsx React.DOM
*/

var HeaderRow = React.createClass({

	getInitialState() {
		return {
			currencyPairInputVisible: false,
			currencyPairInputNeedsFocus: false
		};
	},

	/** Called after initial render */
	componentDidMount() {
		this.getCurrencyPairInputElement().addEventListener("keyup", function(event) {
			if(event.keyCode === 13) {
				this.onCurrencyPairChanged({
					target: event.srcElement
				});
			}
		}.bind(this));
	},

	/** Called after each render */
	componentDidUpdate() {
		if(this.state.currencyPairInputNeedsFocus === true) {
			this.focusOnCurrencyPairInput();
		}
	},

	onCurrencyPairClicked() {
		this.setState({
			currencyPairInputVisible: true,
			currencyPairInputNeedsFocus: true
		});
	},

	onCurrencyPairKeyPress(event) {
		console.log(event);
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
			<div className="Tile-headerBar">
				<div className="Tile-headerBar--currencyPair">
					<span style={currencyPairLabelStyle} onClick={this.onCurrencyPairClicked}>{this.props.currencyPair}</span>
					<input style={currencyPairInputStyle} defaultValue={this.props.currencyPair} onBlur={this.onCurrencyPairChanged}/>
				</div>
				<div className="Tile-headerBar--closeButton Tile-btn">X</div>
				<div className="Tile-headerBar--menuButton Tile-btn">m</div>
			</div>
		);
	},

	getCurrencyPairInputElement() {
		return this.getDOMNode().querySelector(".Tile-headerBar--currencyPair input");
	},

	focusOnCurrencyPairInput() {
		var el = this.getCurrencyPairInputElement();
		el.value = this.props.currencyPair;

		if (typeof el.selectionStart == "number") {
			el.selectionStart = el.selectionEnd = el.value.length;
		} else if (typeof el.createTextRange != "undefined") {
			el.focus();
			var range = el.createTextRange();
			range.collapse(false);
			range.select();
		}

		this.setState({currencyPairInputNeedsFocus: false});
	}
});