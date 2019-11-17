import React from 'react';
import './home.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import Metrics from '../metrics/metrics.js'
import FoodTable from '../foodTable/foodTable.js';
import Search from '../search/search.js'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {foodList:[], metrics:{}};
  }

  componentDidMount() {
    (async () => {
      const response = await fetch(`/api/foods/`);
      const foods = await response.json();
      this.setState({foodList: foods});
    })();
  }

  calcFoodMetrics() {
    if (!this.state.foodList) return;
    const total = this.state.foodList.reduce((acc, food) => {
      acc.calories += food.calories;
      acc.protein += food.protein;
      acc.carbohydrate += food.carbohydrate;
      acc.fat += food.fat;
      return acc;
    }, {calories:0, protein:0, carbohydrate:0, fat:0});
    return total;
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      this.setState({metrics: this.calcFoodMetrics()});
    }
  }

  handleRowDelete(deleted_id) {
    this.setState({
      foodList: [...this.state.foodList].filter((food) => food._id !== deleted_id)
    });
  }

  render() {
    return (
      <div className="home">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className="card">
              <CardContent>
                <Metrics 
                  calories={this.state.metrics.calories}
                  protein={this.state.metrics.protein}
                  carbohydrate={this.state.metrics.carbohydrate}
                  fat={this.state.metrics.fat}
                  // Hardcoded target here, make variable when implementing goals section
                  target={{calories: 2700, protein:200, carbohydrate: 200, fat: 100}}
                ></Metrics>
              </CardContent>
            </Card>
          </Grid>
  
          {/* Left Column */}
          <Grid item xs={7}>
            <Card className="card">
              <FoodTable 
                rows={this.state.foodList}
                onRowDelete={(deleted_row) => this.handleRowDelete(deleted_row)}
              >
              </FoodTable>
            </Card>
          </Grid>
          
          {/* Right Column */}
          <Grid item xs={5}>
            <Card className="card">
              <CardContent>
                <Search>
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
