import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class FoodTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: (props.rows || []),
    }
    this.onRowDelete = props.onRowDelete;
  }

  componentDidUpdate(prevProps) {
    // TODO: String comparison here feels hacky
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setState({...this.props});
    }
  }

  handleDeleteClicked(event, food_id) {
    const settings = {
      method: 'DELETE',
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    }

    (async () => {
      const _response = await fetch(`/api/foods/${food_id}`, settings);
      const response = await _response.json();
      
      if (response.success) {
        this.setState({
          rows: [...this.state.rows].filter((food) => food._id !== food_id)
        });

        if (this.onRowDelete) {
          this.onRowDelete(food_id);
        }
      }
    })();
  }

  render() {
    return (
      <div style={{overflowY:'scroll', maxHeight:500}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Food Name</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Protein (g)</TableCell>
              <TableCell align="right">Carbs (g)</TableCell>
              <TableCell align="right">Fat (g)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.carbohydrate}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(event) => this.handleDeleteClicked(event, row._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default FoodTable;