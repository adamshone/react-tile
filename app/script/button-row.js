/**
* @jsx React.DOM
*/

var ButtonRow = React.createClass({

	render() {

		return(
			<div className="Tile-btnRow">
		        <ExecuteButton side="bid" rate={this.props.bidAllIn} onClick={this.props.onExecuteButtonClicked} />
		        <ExecuteButton side="ask" rate={this.props.askAllIn} onClick={this.props.onExecuteButtonClicked} />
			</div>
		);
	}
});