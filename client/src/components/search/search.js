import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
class Search extends React.Component {
  // Find a better event to update things on
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      options: []
    }
  }

  handleInputChange(event, value) {
    // TODO: fix this Temporary Ghetto "Debounce"
    if(value != "" && value.length > 2) {
      // Make loader appear and keep popper open
      this.setState(state => ({
        open: true,
        loading: true
      }));

      (async () => {
        const response = await fetch(`/api/nutritionix/${value}`);
        const foods = await response.json();
        this.setState(state => ({
          options: Object.keys(foods)
          .map((key) => {
            return foods[key];
          })
          .flat()
          .map((food) => {
            return { name: food.food_name };
          }),
          loading: false
        }))
      })();
    } else {
      this.setState(state => ({
        open: false,
        loading: false
      }));
    }
  }

  render() { 
    return(
      <Autocomplete
        id="search-select"
        open={this.state.open}
        disableOpenOnFocus={true}
        // TODO: Figure out better way to get rid of the bindings, figure out newer syntax
        onInputChange={this.handleInputChange.bind(this)}
        getOptionLabel={option => option.name}
        options={this.state.options}
        loading={this.state.loading}
        renderInput={params => (
          <TextField
            {...params}
            label="Search Foods"
            fullWidth
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    );
  }
}

export default Search;
