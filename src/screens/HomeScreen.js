import React from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import '../App.css';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AltaProducto from '../components/AltaProducto';
import ModalCarrito from '../components/ModalCarrito';
import Slider from '../components/Slider';
import BarraSecundaria from '../components/BarraSecundaria';
import Categorias from '../components/Categorias';
import Footer from '../components/Footer';
import RRHHScreen from './RRHHScreen';
import BotonAgregarEmpleado from '../components/BotonAgregarEmpleado';
import TodosLosProductos from './TodosLosProductos';
import BotonLogin from '../components/login/BotonLogin';
import { Grid } from '@material-ui/core';
import Reportes from '../components/Reportes';
import firebase from 'firebase/firebase'
import Logo from '../imagenes/logo.jpeg';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            producto: "",
            BusquedaActivada: false,
            modoRRHH: false,
            modoEmpleado: false,
            openNuevoEmpleado: false,
            openReportes: false,
            modoCliente: false,
            openCarritoModal: false,
            modoCompra: false,
            user: null,
            fechaHoy: "",
        }
        this.handleChangeProducto = this.handleChangeProducto.bind(this);
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user: user });
        });
        var currentDate = new Date();
        var date = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        var fecha = year + "-" + this.pad(month + 1) + "-" + date;
        this.setState({ fechaHoy: fecha })
    }

    pad(n) {
        return n < 10 ? '0' + n : n;
    }

    handleChangeProducto = producto => event => {
        this.setState({ [producto]: event.target.value });
    };

    handleChangeEmpleado = empleado => event => {
        this.setState({ [empleado]: event.target.value });
    };

    loguearseRRHH = () => {
        this.setState({ modoRRHH: true });
    }

    desloguearseRRHH = () => {
        this.setState({ modoRRHH: false });
    }

    loguearseCliente = () => {
        this.setState({ modoCliente: true });
    }

    desloguearseCliente = () => {
        this.setState({ modoCliente: false });
    }

    loguearseEmpleado = () => {
        this.setState({ modoEmpleado: true });
    }

    desloguearseEmpleado = () => {
        this.setState({ modoEmpleado: false });
    }

    openNuevoEmpleado = () => {
        this.setState({ openNuevoEmpleado: true });
    }

    closeNuevoEmpleado = () => {
        this.setState({ openNuevoEmpleado: false });
    }

    openReportes = () => {
        this.setState({ openReportes: true });
    }

    closeReportes = () => {
        this.setState({ openReportes: false });
    }

    abrirModalCarrito = () => {
        this.setState({ openCarritoModal: true });
    }

    handleCloseCarritoModal = () => {
        this.setState({ openCarritoModal: false });
    }

    handleConfirmarModal = () => {
        this.setState({ openCarritoModal: false });
    }

    modoCompra = () => {
        this.setState({ modoCompra: true });
    }

    buscarEnProducos = () => {
        this.setState({ modoCompra: false });
        this.setState({ modoCompra: true });
    }

    callbackkProductos = () => {
        this.modoCompra()
    }

    modoCliente() {
        if (this.state.user) {
            return (
                <div>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={this.abrirModalCarrito}>VER CARRITO</Button>
                        </Grid>
                        <Grid item>
                            <BotonLogin user={this.state.user} />
                        </Grid>
                    </Grid>
                    <Dialog
                        open={this.state.openCarritoModal}
                        onClose={this.handleCloseCarritoModal}
                        TransitionComponent={Transition}
                        aria-labelledby="form-dialog-title"
                    >
                        <ModalCarrito handleCloseCarritoModal={this.handleCloseCarritoModal.bind(this)} handleConfirmarModal={this.handleConfirmarModal.bind(this)} cliente={this.state.user} />
                    </Dialog>
                </div>
            );
        } else {
            return (
                <div>
                    <BotonLogin user={this.state.user} />
                </div>
            )
        }
    }

    render() {
        const openNuevoEmpleado = this.state.openNuevoEmpleado;
        const openReportes = this.state.openReportes;
        if (this.state.modoRRHH) {
            return (
                <div>
                    <div id="BarraNavegacion">
                        <Navbar bg="dark" expand="lg" variant="dark">
                            <Navbar.Brand href="/"><img src={Logo} width="40" height="40" alt=""/> UADEFOUR
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto" />
                                <Form inline>
                                    <div className="campos-busqueda">
                                        <FormControl type="text" placeholder="Empleado" className="mr-sm-2" onChange={this.handleChangeEmpleado('empleado')} />
                                        <Button variant="contained" color="primary" className="mr-sm-2" onClick={this.ejecutarBusqueda}>FILTRAR</Button>
                                        <Button variant="contained" color="primary" className="mr-sm-2" onClick={this.openNuevoEmpleado}>AGREGAR EMPLEADO</Button>
                                    </div>
                                    <div>
                                        <Button variant="contained" color="primary" className="mr-sm-2" onClick={this.desloguearseRRHH}>SALIR</Button>
                                    </div>
                                </Form>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <RRHHScreen />
                    <Dialog
                        open={openNuevoEmpleado}
                        onClose={this.openNuevoEmpleado}
                        TransitionComponent={Transition}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Agregar Empleado</DialogTitle>
                        {/*    Agregar Empleado      */}
                        <BotonAgregarEmpleado closeNuevoEmpleado={this.closeNuevoEmpleado.bind()} />
                    </Dialog>
                </div>
            );
        } else {
            if (this.state.modoEmpleado) {
                return (
                    <div>
                        <div id="BarraNavegacion">
                            <Navbar bg="dark" expand="lg" variant="dark">
                                <Navbar.Brand href="/"><img src={Logo} width="40" height="40" alt=""/> UADEFOUR</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto" />
                                    <Form inline>
                                        <div className="campos-busqueda">
                                            <FormControl type="text" placeholder="Ingrese Producto" className="mr-sm-2" onChange={this.handleChangeProducto('producto')} />
                                            <Button variant="contained" color="primary" onClick={this.ejecutarBusqueda}>BUSCAR</Button>
                                        </div>
                                        <AltaProducto />
                                        <Button variant="contained" color="primary" className="mr-sm-2" onClick={this.openReportes}>REPORTES</Button>
                                        <Button variant="contained" color="primary" className="mr-sm-2" onClick={this.desloguearseEmpleado}>SALIR</Button>
                                    </Form>
                                </Navbar.Collapse>
                            </Navbar>
                        </div>
                        <Dialog
                            open={openReportes}
                            onClose={this.closeReportes}
                            TransitionComponent={Transition}
                            aria-labelledby="form-dialog-title"
                            fullScreen
                        >
                            <DialogTitle id="form-dialog-title">Reportes</DialogTitle>
                            <Reportes handleCloseCarritoModal={this.closeReportes} fecha={this.state.fechaHoy} />
                        </Dialog>
                        <div className="container">
                            <div className="row">
                                <TodosLosProductos filtroProducto={this.state.producto} modoEmpleadoActivo={this.state.modoEmpleado} />
                            </div>
                        </div>
                    </div>
                );
            } else {
                if (this.state.modoCompra) {
                    return (
                        <div>
                            <div id="BarraNavegacion">
                                <Navbar bg="dark" expand="lg" variant="dark" fixed="top" >
                                    <Navbar.Brand href="/"><img src={Logo} width="40" height="40" alt=""/> UADEFOUR</Navbar.Brand>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="mr-auto" />
                                        <Form inline>
                                            <div className="campos-busqueda">
                                                <FormControl type="text" placeholder="Ingrese Producto" className="mr-sm-2" onChange={this.handleChangeProducto('producto')} />
                                                <Button variant="contained" color="primary" onClick={this.buscarEnProducos.bind()}>BUSCAR</Button>
                                            </div>
                                            {/* Va los botones de login */}
                                            {this.modoCliente()}
                                        </Form>
                                    </Navbar.Collapse>
                                </Navbar>
                            </div>
                            <TodosLosProductos
                                filtroProducto={this.state.producto}
                                modoCompraActivo={this.state.modoCompra}
                                modoClienteActivo={this.state.modoCliente}
                                user={this.state.user}
                            />
                            <Footer modoCompraActivo={this.state.modoCompra} />
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <div id="BarraNavegacion">
                                <Navbar bg="dark" expand="lg" variant="dark">
                                    <Navbar.Brand href="/">
                                    <img src={Logo} width="40" height="40" alt=""/> UADEFOUR</Navbar.Brand>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="mr-auto" />
                                        <Form inline>
                                            <div className="campos-busqueda">
                                                <FormControl type="text" placeholder="Ingrese Producto" className="mr-sm-2" onChange={this.handleChangeProducto('producto')} />
                                                <Button variant="contained" color="primary" onClick={this.modoCompra.bind()}>BUSCAR</Button>
                                            </div>
                                            {this.modoCliente()}
                                        </Form>
                                    </Navbar.Collapse>
                                </Navbar>
                            </div>
                            <div className="container">
                                <BarraSecundaria callbackkProductos={this.callbackkProductos.bind()} />
                            </div>
                            <div >
                                <Slider />
                                <Categorias callbackkProductos={this.callbackkProductos.bind()} />
                                <Footer callbackRRHH={this.loguearseRRHH.bind()} callbackEmpleado={this.loguearseEmpleado.bind()} modoCliente={this.state.user} />
                            </div>
                        </div>
                    );
                }
            }
        }
    }
}
export default Home;