import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
	nameRef = React.createRef();
	priceRef = React.createRef();
	statusRef = React.createRef();
	descRef = React.createRef();
	imageRef = React.createRef();

	static propTypes = {
		addFish: PropTypes.func
	};

	createFish = e => {
		// 1. Stop form from submitting
		e.preventDefault();
		// 2. Save the variables into an object
		const fish = {
			name: this.nameRef.value.value,
			price: parseFloat(this.priceRef.value.value),
			status: this.statusRef.value.value,
			desc: this.descRef.value.value,
			image: this.imageRef.value.value
		};
		// 3. Send the fish into the state
		this.props.addFish(fish);
		// 4. Refresh the form
		e.currentTarget.reset();
	};
	render() {
		return (
			<form className="fish-edit" onSubmit={this.createFish}>
				<input
					type="text"
					name="name"
					ref={this.nameRef}
					placeholder="Name"
					required
				/>
				<input
					type="number"
					name="price"
					ref={this.priceRef}
					placeholder="Price"
					required
				/>
				<select name="status" ref={this.statusRef} required>
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea name="desc" ref={this.descRef} placeholder="Desc" required />
				<input
					type="text"
					name="image"
					ref={this.imageRef}
					placeholder="Image"
					required
				/>
				<button type="submit">+ Add Fish</button>
			</form>
		);
	}
}

export default AddFishForm;
