import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spiner from "./Spiner"

class App extends React.Component {
	state = { lat: null, errorMessage: "" };
	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
			position => {
				//we called setstate!!
				this.setState({ lat: position.coords.latitude });
			},
			err => {
				this.setState({ errorMessage: err.message });
			}
		);
	}

	//define render as required by react
	render() {
		if (this.state.errorMessage && !this.state.lat) {
			return <div>Error: {this.state.errorMessage}</div>;
		}
		if (!this.state.errorMessage && this.state.lat) {
			return <SeasonDisplay lat={this.state.lat} />;
		}
		return <Spiner message="Please accept location request" />;
	}
}

ReactDOM.render(<App />, document.querySelector("#root"));
