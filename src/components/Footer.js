import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Grid, InputAdornment, IconButton } from '@material-ui/core';
import MailOutline from '@material-ui/icons/MailOutline';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import bd from '../index'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: 'white',
  },
  logo: {
    width: '30px',
    height: '30px',
  },
  legal: {
    width: '80px',
    height: '100px',
    margin: '5px',
  },
  barra: {
    backgroundColor: '#212121',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    textAlign: 'left',
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    textAlign: 'center',
  },
});

class FullWidthTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openEmpleado: false,
      openRRHH: false,
      dni: "",
      contrasena: "",
      showPassword: false,
      modoCompraActivo: this.props.modoCompraActivo,
    }
    this.handleChange = this.handleChange.bind(this)
    this.validarContra = this.validarContra.bind(this)
  }

  handleChangeContra = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpenEmpleado = () => {
    this.setState({ openEmpleado: true });
  };

  handleCloseEmpleado = () => {
    this.setState({ openEmpleado: false });
  };

  handleLoginRRHH = () => {
    this.props.callbackRRHH();
  }

  handleLoginEmpleado = () => {
    this.props.callbackEmpleado();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validarContra() {
    const pass = this.state.contrasena
    bd.collection("Empleado").doc(this.state.dni).get()
      .then(doc => {
        if (doc.data().Contrasena === pass)
          if (doc.data().Puesto === "Cajero")
            this.handleLoginEmpleado()
          else
            this.handleLoginRRHH()
        else
          alert("Contraseña Incorrecta")
      })
      .catch(err => {
        console.log('error', err);
        alert("Dni inexistente")
      });
  }

  modoCompra() {
    if (this.state.modoCompraActivo === true || this.props.modoCliente) {
      return (
        <div style={{ margin: '10px' }}>
          <Button variant="outlined" style={{ width: '350px', marginTop: "80px" }} color="inherit" onClick={this.handleClickOpen}>
            Suscripción a novedades
          </Button>
        </div>
      )
    } else {
      return (
        <Grid>
          <Typography variant="h5" color="inherit">
            <br />Empleados<br /><br />
          </Typography>
          <div>
            <div style={{ margin: '10px' }}>
              <Button variant="outlined" style={{ width: '350px' }} color="inherit" onClick={this.handleClickOpenEmpleado}>
                Ingresar como Empleado
              </Button>
            </div>
            <div style={{ margin: '10px' }}>
              <Button variant="outlined" style={{ width: '350px' }} color="inherit" onClick={this.handleClickOpen}>
                Suscripción a novedades
              </Button>
            </div>
            <br />
          </div>
        </Grid>
      )
    };
  }

  render() {
    const { classes, } = this.props;
    const openEmpleado = this.state.openEmpleado;
    const open = this.state.open;
    return (
      <Grid>
        <Grid className={classes.sectionDesktop}>
          <Paper className={classes.root}>
            <Grid container
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item md={3} >
                <Typography variant="h5" color="inherit">
                  <br /> Contacto <br /><br />
                </Typography>
                <Typography variant="subtitle1"  >
                  <MailOutline color="inherit" />
                  <Link href={'mailto:supermercadouadefour@gmail.com'} color="inherit" >
                    {' supermercadouadefour@gmail.com'}
                  </Link>
                </Typography>
              </Grid>
              <Grid item md={3} >
                <Typography variant="h5" color="inherit" >
                  <br />Sobre Nosotros <br /><br />
                </Typography>
                <Typography variant="h6" color="inherit" >
                  Responsable operativo:<br />
                  Integracion de Aplicaciones<br />
                  CUIT: 22-38546123-2<br />
                </Typography>
              </Grid>
              <Grid item md={3} >
                {this.modoCompra()}
                <Dialog
                  open={open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Suscripción a novedades</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Suscribite a nuestras novedades para enterarte de las mejores promociones en nuestras sucursales.
                </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Correo electronico"
                      type="email"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancelar
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                      Suscribete
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={openEmpleado}
                  onClose={this.handleCloseEmpleado}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Ingresar como empleado.</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Inicialice con su DNI y contraseña de la empresa.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="DNI"
                      name="dni"
                      value={this.state.dni}
                      onChange={this.handleChange}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      label="Contraseña"
                      name="contrasena"
                      value={this.state.contrasena}
                      onChange={this.handleChangeContra('contrasena')}
                      fullWidth
                      type={this.state.showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword}
                            >
                              {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseEmpleado} color="primary">
                      Cancelar
                    </Button>
                    <Button onClick={this.validarContra} color="primary">
                      Ingresar
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
            <AppBar position="static" className={classes.barra}>
              <Grid container
                direction="row"
                justify="center"
                alignItems="center"              >
                <Grid item md={9}>
                  <Typography variant="h6" color="inherit">
                    UadeFour
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography variant="h6" color="inherit">
                    Copyright 2019
                  </Typography>
                </Grid>
              </Grid>
            </AppBar>
          </Paper>
        </Grid>
        <Grid className={classes.sectionMobile}>
          <Paper className={classes.root}>
            <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <Typography>
                  <br />
                </Typography>
                <Button variant="outlined" color="inherit" onClick={this.handleClickOpen}>
                  <Typography variant="h6">
                    Suscripción a novedades
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} >
                <Typography variant="h4" color="inherit">
                  Contacto <br />
                </Typography>
                <Typography variant="subtitle1"  >
                  <MailOutline color="inherit" />
                  <Link href={'mailto:supermercadouadefour@gmail.com'} color="inherit" >
                    {' supermercadouadefour@gmail.com'}
                  </Link>
                </Typography>
                <Typography variant="h6" color="inherit">Preguntas Frecuentes</Typography>
              </Grid>
              <Grid item xs={12} >
                <Typography variant="h4" color="inherit" >
                  Sobre Nosotros <br />
                </Typography>
                <Typography variant="h6" color="inherit" >
                  Responsable operativo:<br />
                  Aplicaciones Interacticas<br />
                  CUIT: 22-38546123-2<br />
                </Typography>
              </Grid>
              <Grid item xs={12} >
                {this.modoCompra()}
              </Grid>
            </Grid>
            <AppBar position="static" className={classes.barra}>
              <Grid container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={7}>
                  <Typography variant="h6" color="inherit">
                    UadeFour
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="h6" color="inherit">
                    Copyright 2019
                  </Typography>
                </Grid>
              </Grid>
            </AppBar>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);