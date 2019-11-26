import React, { Component } from 'react';
import { Button, Typography, Dialog, IconButton, Avatar, Slide, Grid } from '@material-ui/core';
import IniciarSesion from './IniciarSesion';
import Registro from './Registro';
import AuthController from './AuthController';
import firebase from 'firebase/firebase';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class BotonLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            openL: false,
            openR: false,
        }
    }

    handleOpenInicio = () => {
        this.setState({ openL: true });
    }

    handleCloseInicio = () => {
        this.setState({ openL: false });
    }

    handleOpenRegistro = () => {
        this.setState({ openR: true });
    }

    handleCloseRegistro = () => {
        this.setState({ openR: false });
    }

    renderAvatar() {
        if (this.state.user.photoURL === null) {
            return (
                <div>
                    <IconButton variant="contained" >
                        <Avatar>{this.state.user.displayName.charAt(0)}</Avatar>
                    </IconButton>
                </div>
            )
        } else {
            return (
                <div>
                    <IconButton variant="contained" >
                        <Avatar src={this.state.user.photoURL} alt={this.state.user.displayName} />
                    </IconButton>
                </div>
            )
        }
    }

    isloginFacebook() {
        var face = firebase.auth().currentUser.providerData[0].providerId
        if (face === "facebook.com") {
            return true
        } else {
            return false
        }
    }

    render() {
        const openInicio = this.state.openL;
        const openRegistro = this.state.openR;
        if (this.state.user) {
            if (this.state.user.emailVerified || this.isloginFacebook() === true) {
                return (
                    <Grid container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                    >
                        <Grid item >
                            {this.renderAvatar()}
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" className="mr-sm-2" onClick={AuthController.handleLogout}>Salir</Button>
                        </Grid>
                    </Grid>
                )
            } else {
                return (
                    <div>
                        {alert('Verifica tu mail y refresca la pagina')}
                        <Typography color="secondary">
                            Verifica tu mail
                         </Typography>
                         <Button variant="contained" color="primary" onClick={AuthController.handleLogout}>Cancelar</Button>
                    </div>
                )
            }
        } else {
            return (
                <div>
                    <Button variant="contained" color="primary" className="mr-sm-2" onClick={this.handleOpenInicio}>Iniciar Sesion</Button>
                    <Button variant="contained" color="primary" className="mr-sm-2" onClick={this.handleOpenRegistro}>Registrarse</Button>
                    <Dialog TransitionComponent={Transition} open={openInicio} onClose={this.handleCloseInicio}>
                        <IniciarSesion />
                    </Dialog>
                    <Dialog TransitionComponent={Transition} open={openRegistro} onClose={this.handleCloseRegistro}>
                        <Registro />
                    </Dialog>
                </div>
            )
        }
    }
}
export default BotonLogin;