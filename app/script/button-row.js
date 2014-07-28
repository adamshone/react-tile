/**
* @jsx React.DOM
*/

var ButtonRow = React.createClass({

	render() {

		return(
			<div className="Tile-btnRow">
		        <ExecuteButton rate={this.props.bidAllIn} />
		        <ExecuteButton rate={this.props.askAllIn} />
			</div>
		);
	}
});