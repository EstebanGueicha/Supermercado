import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Empleados from '../components/Empleados';
import db from '../index';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 800,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,

  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
});

class RRHHScrean extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dense: true,
      item: [],
    };
  }

  componentDidMount() {
    db.collection("Empleado").onSnapshot((snapShots) => {
      this.setState({
        item: snapShots.docs.map(doc => {
          console.log(doc.data())
          return { id: doc.id, data: doc.data() }
        })
      })
    }, error => {
      console.log(error)
    });
  }

  render() {
    const { classes } = this.props;
    const empleado = this.state.item;
    return (
      <div className="container" >
        <div id="titulo-empleados-RRHH" className="col-10">
          <Typography variant="h5" align="center" className={classes.title}>
            Lista de Empleados
          </Typography>
        </div>
        <Grid item xs={12} md={12}>
          <div id="container-empleados-RRHH">
            <List id="container-lista-empleados-RRHH" dense={this.state.dense}>
              {empleado.map(item => (
                <div key={item.id}>
                  <Empleados nombre={item.data.Nombre} apellido={item.data.Apellido} fechaNac={item.data.FechaNac} dni={item.data.DNI} puesto={item.data.Puesto} />
                </div>
              ))}
            </List>
          </div>
        </Grid>
      </div>
    )
  }
}

RRHHScrean.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RRHHScrean);