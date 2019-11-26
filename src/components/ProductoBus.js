import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, IconButton, TextField, Dialog, DialogTitle, Slide } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DetalleProducto from './DetalleProducto';
import Modificar from './BD/Modificar';
import Agregar from './BD/Agregar';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
    card: {
        maxWidth: 200,
    },
    media: {
        height: 200,
    },
})

class ProductoBus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: this.props.nombre,
            codigo: this.props.codigo,
            marca: this.props.marca,
            color: this.props.color,
            origen: this.props.origen,
            dimensiones: this.props.dimensiones,
            descripcion: this.props.descripcion,
            precio: this.props.precio,
            stock: this.props.stock,
            imagen: this.props.imagen,
            categoria: this.props.categoria,
            Cliente: this.props.modoCliente,
            cantidad: 0,
            open: false,
            user: this.props.user
        }
        this.handleChange = this.handleChange.bind(this);
        this.modoClienteActivo = this.modoClienteActivo.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            this.setState({ user: this.props.user });
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    aumentar() {
        this.setState({ cantidad: this.state.cantidad + 1 })
    }

    decrementar() {
        let cantidad = this.state.cantidad
        if (cantidad > 0) {
            this.setState({ cantidad: cantidad - 1 })
        }
    }

    BuscarDetalles = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    modoClienteActivo() {
        if (this.state.user != null)
            this.agregarACarrito()
        else
            alert("Inicie sesion para agragar elementos al carrito")
    }

    agregarACarrito = () => {
        if (0 < parseInt(this.state.cantidad)) {
            if (parseInt(this.state.stock) >= parseInt(this.state.cantidad)) {
                var nuevoStock = (parseInt(this.state.stock) - parseInt(this.state.cantidad))
                const Nombre = this.state.nombre;
                const Codigo = this.state.codigo;
                const Marca = this.state.marca;
                const Color = this.state.color;
                const Origen = this.state.origen;
                const Dimensiones = this.state.dimensiones;
                const Descripcion = this.state.descripcion;
                const Precio = this.state.precio;
                const Stock = nuevoStock;
                const Imagen = this.state.imagen;
                const Categoria = this.state.categoria;
                Modificar.modificarProducto(Codigo, Nombre, Marca, Color, Precio, Origen, Dimensiones, Descripcion, Stock, Imagen, Categoria);
                Agregar.agregarCarrito(Nombre, this.state.cantidad, Precio, Codigo, this.state.user.email)
                alert("Tu producto se agrego al carrito")
            } else {
                alert("No hay tanto stock.")
            }
        } else {
            alert("Seleccione la cantidad por favor")
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea onClick={() => this.BuscarDetalles()}>
                    <CardMedia
                        className={classes.media}
                        image={this.state.imagen}
                        title={this.state.nombre}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h1">
                            {this.state.nombre}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.state.descripcion}
                        </Typography>
                        <Typography variant="h5" color="primary">
                            ${this.state.precio}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <IconButton size="small" color="primary" onClick={this.decrementar.bind(this)}>
                        <RemoveIcon />
                    </IconButton>
                    <TextField
                        name="cantidad"
                        variant="outlined"
                        margin="dense"
                        value={this.state.cantidad}
                        onChange={this.handleChange}
                        inputProps={{ style: { textAlign: 'center' } }}
                    />
                    <IconButton size="small" color="primary" onClick={this.aumentar.bind(this)}>
                        <AddIcon />
                    </IconButton>
                    <IconButton size="medium" color="primary" onClick={this.modoClienteActivo} >
                        <AddShoppingCartIcon />
                    </IconButton>
                </CardActions>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Detalles del Producto</DialogTitle>
                    <DetalleProducto
                        nombre={this.state.nombre}
                        codigo={this.state.codigo}
                        marca={this.state.marca}
                        color={this.state.color}
                        origen={this.state.origen}
                        dimensiones={this.state.dimensiones}
                        descripcion={this.state.descripcion}
                        precio={this.state.precio}
                        stock={this.state.stock}
                        imagen={this.state.imagen}
                        categoria={this.state.categoria}
                        modoEmpleado={this.state.modoEmpleado}
                    />
                </Dialog>
            </Card>
        );
    }
}

ProductoBus.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductoBus);