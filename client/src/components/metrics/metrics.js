import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


class Metrics extends React.Component {
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

  computePercentage(key) {
    return 100*(this.state[key]/this.state.target[key]);
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <Grid 
          container 
          spacing={3}
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <CircularProgress size={200} variant="static" value={this.computePercentage('calories')} />
          <CircularProgress size={200} variant="static" value={this.computePercentage('protein')} />
          <CircularProgress size={200} variant="static" value={this.computePercentage('carbohydrate')} />
          <CircularProgress size={200} variant="static" value={this.computePercentage('fat')} />
        </Grid>      
      </div>
    );
  }
}

export default Metrics;
