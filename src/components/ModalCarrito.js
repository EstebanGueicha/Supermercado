import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import db from '../index'
import BtEliminarProducto from './BtEliminarProducto';
import Eliminar from './BD/Eliminar';
import { Dialog, Slide } from '@material-ui/core';
import ModalDatosUser from './ModalDatosUser';
import Modificar from './BD/Modificar';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ModalCarrito extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            item: [],
            total: "",
            Cliente: this.props.cliente,
            openDatosUserModal: false,
            email: "",
            nombre: "",
        }
        this.vaciarCarrito = this.vaciarCarrito.bind(this)
        this.confirmaCarrito = this.confirmaCarrito.bind(this)
        this.vaciarCarritoComprado = this.vaciarCarritoComprado.bind(this)
    }

    componentDidMount() {
        db.collection("Carrito").doc(this.state.Cliente.email).collection("Almacenado").onSnapshot((snapShots) => {
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

    handleCloseCarritoModal = () => {
        this.props.handleCloseCarritoModal();
        this.setState({ openDatosUserModal: false });
    };

    handleConfirmarModal = () => {
        this.setState({ openDatosUserModal: true });
    }

    handleCloseDatosUser = () => {
        this.setState({ openDatosUserModal: false });
    }

    vaciarCarritoComprado() {
        const carrito = this.state.item
        carrito.map(item => (
            <Button onClick={Eliminar.eleliminarElementoCarrito(this.state.Cliente.email, item.data.Codigo)} />
        ))
    }

    vaciarCarrito() {
        const carrito = this.state.item
        carrito.map(item => (
            <div key={item.id}>
                {this.devolverAlStock(item.data.Codigo, item.data.Cantidad)}
                <Button onClick={Eliminar.eleliminarElementoCarrito(this.state.Cliente.email, item.data.Codigo)} />
            </div>
        ))
    }

    confirmaCarrito() {
        const carro = this.state.item;
        var cantTotal = 0;
        carro.map(item => (
            cantTotal = cantTotal + (item.data.Cantidad * item.data.Precio)
        ))
        this.setState({ total: cantTotal })
        if (cantTotal === 0) {
            alert("No hay elementos en el carrito");
        } else {
            this.handleConfirmarModal()
        }
    }

    devolverAlStock(Codigo, Cantidad) {
        var cant = Cantidad
        db.collection("Producto").doc(Codigo).get()
            .then(doc => {
                cant = doc.data().Stock + cant
                Modificar.modificarProducto(
                    Codigo,
                    doc.data().Nombre,
                    doc.data().Marca,
                    doc.data().Color,
                    doc.data().Precio,
                    doc.data().Origen,
                    doc.data().Dimensiones,
                    doc.data().Descripcion,
                    cant,
                    doc.data().Imagen,
                    doc.data().Categoria
                )
            })
            .catch(err => {
                console.log('error', err);
            });
    }

    render() {
        const carrito = this.state.item;
        var cantTotal = 0;
        carrito.map(item => (
            cantTotal = cantTotal + (item.data.Cantidad * item.data.Precio)
        ))
        return (
            <div>
                <DialogTitle id="form-dialog-title">Carrito de Productos</DialogTitle>
                <DialogContent>
                    <Paper style={{
                        width: '100%',
                        marginTop: 30,
                        overflowX: 'auto',
                    }
                    }>
                        <Table style={{
                            minWidth: 500,
                        }}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Producto</StyledTableCell>
                                    <StyledTableCell align="right">Cantidad</StyledTableCell>
                                    <StyledTableCell align="right">Precio Unitario</StyledTableCell>
                                    <StyledTableCell align="right">Precio Total</StyledTableCell>
                                    <StyledTableCell align="right">Eliminar</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {carrito.map(item => (
                                    <StyledTableRow key={item.id}>
                                        <StyledTableCell component="th" scope="row">
                                            {item.data.Producto}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{item.data.Cantidad}</StyledTableCell>
                                        <StyledTableCell align="center">$ {item.data.Precio}</StyledTableCell>
                                        <StyledTableCell align="center">$ {item.data.Cantidad * item.data.Precio}</StyledTableCell>
                                        <StyledTableCell align="right"><BtEliminarProducto usuario={this.state.Cliente} codigo={item.data.Codigo} cantidad={item.data.Cantidad} /></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                <StyledTableRow >
                                    <StyledTableCell component="th" scope="row">
                                        Total Final
                                        </StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                    <StyledTableCell align="center"> $ {cantTotal}</StyledTableCell>
                                    <StyledTableCell align="right"></StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.vaciarCarrito} color="secondary" variant="contained">
                        Vaciar Carrito
                    </Button>
                    <Button onClick={this.handleCloseCarritoModal} color="primary" variant="contained">
                        Volver
                    </Button>
                    <Button onClick={this.confirmaCarrito} color="primary" variant="contained">
                        Confirmar Carrito
                    </Button>
                </DialogActions>
                <Dialog
                    open={this.state.openDatosUserModal}
                    onClose={this.handleCloseDatosModal}
                    TransitionComponent={Transition}
                >
                    <ModalDatosUser
                        handleVolverDeDatosModal={this.handleCloseDatosUser}
                        handleCloseDatosModal={this.handleCloseCarritoModal}
                        total={this.state.total}
                        user={this.state.Cliente}
                        productos={this.state.item}
                        vaciar={this.vaciarCarritoComprado}
                    />
                </Dialog>
            </div>
        );
    }
}
export default ModalCarrito;