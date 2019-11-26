import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.primary.main
  },
});

class Paneles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: this.props.categorias,
      origen: this.props.origen,
      colores: this.props.colores,
    }
    this.mandarCategorias = this.mandarCategorias.bind(this)
    this.mandarOrigen = this.mandarOrigen.bind(this)
    this.mandarColores = this.mandarColores.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.categorias !== prevProps.categorias) {
      this.mandarCategorias()
    }
    if (this.props.origen !== prevProps.origen) {
      this.mandarOrigen()
    }
    if (this.props.colores !== prevProps.colores) {
      this.mandarColores()
    }
  }

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  mandarCategorias = () => {
    this.props.callbackCategorias(this.state.categorias);
  }

  mandarOrigen = () => {
    this.props.callbackOrigen(this.state.origen);
  }

  mandarColores = () => {
    this.props.callbackColores(this.state.colores);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel defaultExpanded style={{ backgroundColor: "#eeeeee" }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon color="primary" />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading} >Categorias</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ backgroundColor: "#ffffff" }}>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                className={classes.group}
                row
                name="categorias"
                aria-label="categorias"
                value={this.state.categorias}
                onChange={this.handleChange('categorias')}
              >
                <FormControlLabel value="Todos" control={<Radio color="primary" />} label="Todos" />
                <FormControlLabel value="Tecnologia" control={<Radio color="primary" />} label="Tecnologia" />
                <FormControlLabel value="Decoracion" control={<Radio color="primary" />} label="Decoracion" />
                <FormControlLabel value="Bebidas" control={<Radio color="primary" />} label="Bebidas" />
                <FormControlLabel value="Electrodomesticos" control={<Radio color="primary" />} label="Electrodomesticos" />
                <FormControlLabel value="Alimentos" control={<Radio color="primary" />} label="Alimentos" />
              </RadioGroup>
              <Button onClick={this.mandarCategorias}>Filtrar</Button>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel defaultExpanded style={{ backgroundColor: "#eeeeee" }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon color="primary" />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Origen</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ backgroundColor: "#ffffff" }}>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                className={classes.group}
                row
                name="origen"
                aria-label="origen"
                value={this.state.origen}
                onChange={this.handleChange('origen')}
              >
                <FormControlLabel value="Todos" control={<Radio color="primary" />} label="Todos" />
                <FormControlLabel value="Argentina" control={<Radio color="primary" />} label="Argentina" />
                <FormControlLabel value="Chile" control={<Radio color="primary" />} label="Chile" />
                <FormControlLabel value="China" control={<Radio color="primary" />} label="China" />
                <FormControlLabel value="Estados Unidos" control={<Radio color="primary" />} label="Estados Unidos" />
                <FormControlLabel value="Paraguay" control={<Radio color="primary" />} label="Paraguay" />
                <FormControlLabel value="Otros" control={<Radio color="primary" />} label="Otros" />
              </RadioGroup>
              <Button onClick={this.mandarOrigen}>Filtrar</Button>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel defaultExpanded style={{ backgroundColor: "#eeeeee" }} >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon color="primary" />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>Colores</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ backgroundColor: "#ffffff" }}>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                className={classes.group}
                row
                name="colores"
                aria-label="colores"
                value={this.state.colores}
                onChange={this.handleChange('colores')}
              >
                <FormControlLabel value="Todos" control={<Radio color="primary" />} label="Todos" />
                <FormControlLabel value="Azul" control={<Radio color="primary" />} label="Azul" />
                <FormControlLabel value="Negro" control={<Radio color="primary" />} label="Negro" />
                <FormControlLabel value="Blanco" control={<Radio color="primary" />} label="Blanco" />
                <FormControlLabel value="Gris" control={<Radio color="primary" />} label="Gris" />
                <FormControlLabel value="Otro" control={<Radio color="primary" />} label="Otro" />
              </RadioGroup>
              <Button onClick={this.mandarColores}>Filtrar</Button>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

Paneles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Paneles);