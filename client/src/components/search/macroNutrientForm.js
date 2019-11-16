import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class MacroNutrientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...this.props};
  }

  componentDidUpdate(prevProps) {
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
    debugger
    console.log()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
        {/* Container with 2 top inputs */}
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth={true}
              id="food_name"
              label="Food Name"
              margin="normal"
              variant="filled"
              value={this.state.food_name}
              onChange={this.handleChange.bind(this)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth={true}
              id="calories"
              label="Calories"
              margin="normal"
              variant="filled"
              value={this.state.calories}
              onChange={this.handleChange.bind(this)}
            />
          </Grid>
        </Grid>

        {/* Container with 3 bottom inputs */}
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              fullWidth={true}
              id="protein"
              label="Protein"
              margin="normal"
              variant="filled"
              value={this.state.protein}
              onChange={this.handleChange.bind(this)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth={true}
              id="carbohydrate"
              label="Carbs"
              margin="normal"
              variant="filled"
              value={this.state.carbohydrate}
              onChange={this.handleChange.bind(this)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth={true}
              id="fat"
              label="Fats"
              margin="normal"
              variant="filled"
              value={this.state.fat}
              onChange={this.handleChange.bind(this)}
            />
          </Grid>
        </Grid>
        {/* Container to center button */}
        <Grid container justify="center">
          <Button variant="contained" type="submit" size="medium" color="primary">
            Add Food
          </Button>
        </Grid>
      </form>
    );
  }
}

export default MacroNutrientForm;
