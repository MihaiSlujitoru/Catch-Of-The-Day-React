import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
	state = {
		fishes: {},
		order: {}
	};

	static propTypes = {
		match: PropTypes.object
	};

	componentDidMount() {
		const { params } = this.props.match;
		// 1. Reinstate our localstorage
		const localStorageRef = localStorage.getItem(params.storeId);

		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}

		this.ref = base.syncState(`${params.storeId}/fishes/`, {
			context: this,
			state: "fishes"
		});
	}

	componentDidUpdate() {
		const { params } = this.props.match;
		localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	addfish = fish => {
		// 1. Take a copy of the existing state
		const fishes = { ...this.state.fishes };
		// 2. Add our new fish to that fishes
		fishes[`fish${Date.now()}`] = fish;
		// 3. Set the new fishes object to state
		this.setState({
			fishes: fishes
		});
	};

	updateFish = (key, updateFish) => {
		// 1. Take a copy of the existing state
		const fishes = { ...this.state.fishes };
		// 2. Update that state
		fishes[key] = updateFish;
		// 3. Set the new state
		this.setState({ fishes: fishes });
	};

	deleteFish = key => {
		// 1. Take a copy of the existing state
		const fishes = { ...this.state.fishes };
		// 2. Remove the fish from state (Update the state)
		fishes[key] = null;
		// 3. Set new state
		this.setState({ fishes: fishes });
	};

	loadSamplesFishes = () => {
		this.setState({ fishes: sampleFishes });
	};

	addToOrder = key => {
		// 1. Take a copy of state
		const order = { ...this.state.order };
		// 2. Add to order or update the order
		order[key] = order[key] + 1 || 1;
		// 3. Call setstate to update the state
		this.setState({
			order: order
		});
	};

	removeFromOrder = key => {
		// 1. Take a copy of the state
		const order = { ...this.state.order };
		// 2. Remove the order
		delete order[key];
		// Set new State
		this.setState({ order: order });
	};

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />

					<ul className="fishes">
						{Object.keys(this.state.fishes).map(key => (
							<Fish
								key={key}
								index={key}
								details={this.state.fishes[key]}
								addToOrder={this.addToOrder}
							/>
						))}
					</ul>
				</div>
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					removeFromOrder={this.removeFromOrder}
				/>
				<Inventory
					addFish={this.addfish}
					updateFish={this.updateFish}
					deleteFish={this.deleteFish}
					loadSamplesFishes={this.loadSamplesFishes}
					fishes={this.state.fishes}
					storeId={this.props.match.params.storeId}
				/>
			</div>
		);
	}
}

export default App;
