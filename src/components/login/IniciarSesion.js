import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import AuthController from './AuthController';
import LogoGoogle from './icono/logoGoogle.png';
import LogoFace from './icono/logoFacebook.png';
import { Dialog } from '@material-ui/core';
import CambiarPass from './RecuperoPass';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  botonicono: {
    margin: theme.spacing(1, 0, 1),
  },
  icono: {
    margin: '4px',
    width: '7%',
    height: '7%',
  },
});

class IniciarSesion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: '',
      contra: '',
      showPassword: false,
      open: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginCorreo = this.loginCorreo.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChangeContra = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  loginCorreo() {
    const Correo = this.state.correo;
    const Contrasena = this.state.contra;
    AuthController.handleIniciar(Correo, Contrasena);
  }

  handleOpenContra = () => {
    this.setState({ open: true });
  }

  handleCloseContra = () => {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;
    const open = this.state.open;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesion
        </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Correo Electronico"
              name="correo"
              type="correo"
              autoComplete="email"
              autoFocus
              value={this.state.correo}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="contra"
              label="Contraseña"
              type={this.state.showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={this.state.contra}
              onChange={this.handleChangeContra('contra')}
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.loginCorreo}
            >
              Iniciar Sesion
          </Button>
            <Grid container>
              <Grid item xs>
                {/*    Cambiar contraseña             */}
                <Link href="#" onClick={this.handleOpenContra} variant="body2">
                  Olvidaste la contraseña?
              </Link>
                <Dialog open={open} onClose={this.handleCloseContra} >
                  <CambiarPass />
                </Dialog>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.botonicono}
                  onClick={AuthController.handleAuthGoogle}>
                  <img src={LogoGoogle} alt="LogoGoogle" className={classes.icono} />
                  Iniciar Sesion con Google
              </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.botonicono}
                  onClick={AuthController.handleAuthFace}>
                  <img src={LogoFace} alt="LogoFace" className={classes.icono} />
                  Iniciar Sesion con Facebook
              </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

IniciarSesion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IniciarSesion);