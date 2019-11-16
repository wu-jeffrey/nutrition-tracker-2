import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class MacroNutrientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...this.props};
  }

  componentDidUpdate(prevProps) {
    console.log('update');
    // TODO: String comparison here feels hacky
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setState({...this.props});
    }
  }

  // TODO: Debounce this!
  handleChange(event) {
    // TODO: Find better way to stop circular propagation
    // i.e. statechange triggers onchange, which triggers statechange, ...
    if (this.state[event.target.id] === event.target.value) return;
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    console.log()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <TextField
            required
            id="food_name"
            label="Food Name"
            margin="normal"
            variant="filled"
            value={this.state.food_name}
            onChange={this.handleChange.bind(this)}
          />
          <TextField
            id="calories"
            label="Calories"
            margin="normal"
            variant="filled"
            value={this.state.calories}
            onChange={this.handleChange.bind(this)}
          />
          <TextField
            id="protein"
            label="Protein"
            margin="normal"
            variant="filled"
            value={this.state.protein}
            onChange={this.handleChange.bind(this)}
          />
          <TextField
            id="carbohydrate"
            label="Carbs"
            margin="normal"
            variant="filled"
            value={this.state.carbohydrate}
            onChange={this.handleChange.bind(this)}
          />
          <TextField
            id="fat"
            label="Fats"
            margin="normal"
            variant="filled"
            value={this.state.fat}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <Button variant="contained" type="submit" size="medium" color="primary">
          Add Food
        </Button>
      </form>
    );
  }
}

export default MacroNutrientForm;
