import React from 'react';
import { DialogTitle, withStyles, DialogContent, TextField, DialogContentText, DialogActions, Button, Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import AuthController from './AuthController';

const styles = theme => ({
});

class CambiarPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.cambiar = this.cambiar.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  cambiar() {
    const Correo = this.state.correo;
    AuthController.handleRecupero(Correo)
  }

  render() {
    return (
      <Container>
        <DialogTitle id="form-dialog-title">Recupero de Contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingrese su correo electronico para que le envien un mail y recupere su contraseña
        </DialogContentText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electronico"
            name="correo"
            type="correo"
            autoComplete="email"
            autoFocus
            value={this.state.correo}
            onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary">
            Cancelar
        </Button>
          <Button onClick={this.cambiar} color="primary">
            Enviar
        </Button>
        </DialogActions>
      </Container>
    )
  }
}

CambiarPass.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CambiarPass);