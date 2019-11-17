import React from 'react';
import './home.css';
import Search from '../search/search.js'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import FoodTable from '../foodTable/foodTable.js';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    (async () => {
      const response = await fetch(`/api/foods/`);
      const foods = await response.json();
      this.setState({foodList: foods});
    })();
  }

  render() {
    return (
      <div className="home">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className="card">
              <CardContent>
                Stuff
              </CardContent>
            </Card>
          </Grid>
  
          {/* Left Column */}
          <Grid item xs={7}>
            <Card className="card">
              <FoodTable rows={this.state.foodList}></FoodTable>
            </Card>
          </Grid>
          
          {/* Right Column */}
          <Grid item xs={5}>
            <Card className="card">
              <CardContent>
                <Search 
                  onSubmit={(newFood) => this.setState({foodList: [...this.state.foodList, newFood]})}>
                </Search>
              </CardContent>
            </Card>
          </Grid>
        </Grid>      
      </div>
    );
  }
}

export default Home;
