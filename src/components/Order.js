import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { formatPrice } from "../helpers";

class Order extends React.Component {
	static propTypes = {
		fishes: PropTypes.object,
		order: PropTypes.object,
		removeFromOrder: PropTypes.func
	};
	renderOrder = key => {
		const fish = this.props.fishes[key];
		const count = this.props.order[key];
		const isAvaibale = fish && fish.status === "available";

		const transitionOptions = {
			classNames: "order",
			key: key,
			timeout: { enter: 250, exit: 250 }
		};

		if (!fish) {
			return null; // making sure the fish is loaded before we continue
		}

		if (!isAvaibale) {
			return (
				<CSSTransition {...transitionOptions}>
					<li key={key}>
						{fish ? fish.name : "fish"} is <br /> no longer available!
						<button onClick={() => this.props.removeFromOrder(key)}>
							&times;
						</button>
					</li>
				</CSSTransition>
			);
		}

		return (
			<CSSTransition {...transitionOptions}>
				<li key={key}>
					<span>
						<TransitionGroup component="span" className="count">
							<CSSTransition
								classNames="count"
								key={count}
								timeout={{ enter: 250, exit: 250 }}
							>
								<span>{count}</span>
							</CSSTransition>
						</TransitionGroup>
						lbs {fish.name}
						<button onClick={() => this.props.removeFromOrder(key)}>
							&times;
						</button>
					</span>
					<span className="price">{formatPrice(count * fish.price)}</span>
				</li>
			</CSSTransition>
		);
	};

	render() {
		const orderIds = Object.keys(this.props.order);
		const total = orderIds.reduce((prevTotal, key) => {
			const fish = this.props.fishes[key];
			const count = this.props.order[key];
			const isAvaibale = fish && fish.status === "available";

			if (isAvaibale) {
				return prevTotal + count * fish.price;
			}

			return prevTotal;
		}, 0);

		return (
			<div className="order-wrap">
				<h2>Order</h2>
				<TransitionGroup component="ul" className="order">
					{orderIds.map(this.renderOrder)}
				</TransitionGroup>
				<p className="total">
					<strong>Total:</strong> {formatPrice(total)}
				</p>
			</div>
		);
	}
}

export default Order;
