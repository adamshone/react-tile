/**
* @jsx React.DOM
*/

var ButtonLabelRow = React.createClass({

	render() {

		return(
			<div className="Tile-btnLabelRow">
				<div className="Tile-btnLabelRow--leftBtnLabel">SELL {this.props.dealtCurrency}</div>
				<div className="Tile-btnLabelRow--rightBtnLabel">BUY {this.props.dealtCurrency}</div>
			</div>
		);
	}
});