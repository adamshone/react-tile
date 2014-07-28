/**
* @jsx React.DOM
*/

var HeaderRow = React.createClass({

	render() {

		return(
			<div className="Tile-headerBar">
				<div className="Tile-headerBar--currencyPair">{this.props.currencyPair}</div>
				<div className="Tile-headerBar--closeButton Tile-btn">X</div>
				<div className="Tile-headerBar--menuButton Tile-btn">m</div>
			</div>
		);
	}
});