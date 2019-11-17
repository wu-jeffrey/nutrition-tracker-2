import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from './CircularProgress';


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
    const percentage = 100*(this.state[key]/this.state.target[key]);
    return (percentage > 100 ? 100 : percentage)
  }

  getDialDisplayText(key) {
    const str = `${Math.round(this.state[key])}/${Math.round(this.state.target[key])}`;
    return str;
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
          <CircularProgress 
            label={'calories'} 
            displayText={this.getDialDisplayText('calories')} 
            size={200} 
            variant="static" 
            value={this.computePercentage('calories')} 
          />
          <CircularProgress 
            label={'protein'} 
            displayText={this.getDialDisplayText('protein')} 
            size={200} 
            variant="static" 
            value={this.computePercentage('protein')} 
          />
          <CircularProgress 
            label={'carbohydrate'} 
            displayText={this.getDialDisplayText('carbohydrate')} 
            size={200} 
            variant="static" 
            value={this.computePercentage('carbohydrate')} 
          />
          <CircularProgress 
            label={'fat'} 
            displayText={this.getDialDisplayText('fat')} 
            size={200} 
            variant="static" 
            value={this.computePercentage('fat')} 
          />
        </Grid>      
      </div>
    );
  }
}

export default Metrics;
