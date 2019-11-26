import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Agregar from './BD/Agregar';
import { InputAdornment } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const colores = [
    {
        value: 'Azul',
        label: 'Azul',
    },
    {
        value: 'Negro',
        label: 'Negro',
    },
    {
        value: 'Blanco',
        label: 'Blanco',
    },
    {
        value: 'Gris',
        label: 'Gris',
    },
    {
        value: 'Otro',
        label: 'Otro',
    },
];

const origen = [
    {
        value: 'Argentina',
        label: 'Argentina',
    },
    {
        value: 'Chile',
        label: 'Chile',
    },
    {
        value: 'China',
        label: 'China',
    },
    {
        value: 'Estados Unidos',
        label: 'Estados Unidos',
    },
    {
        value: 'Paraguay',
        label: 'Paraguay',
    },
    {
        value: 'Otro',
        label: 'Otro',
    },
];

const categoria = [
    {
        value: 'Tecnologia',
        label: 'Tecnologia',
    },
    {
        value: 'Decoracion',
        label: 'Decoracion',
    },
    {
        value: 'Bebidas',
        label: 'Bebidas',
    },
    {
        value: 'Electrodomesticos',
        label: 'Electrodomesticos',
    },
    {
        value: 'Alimentos',
        label: 'Alimentos',
    },
];

export default class AltaProducto extends React.Component {
    constructor() {
        super();
        this.state = {
            success: false,
            open: false,
            nombre: "",
            codigo: "",
            marca: "",
            color: '',
            origen: '',
            dimensiones: "",
            descripcion: "",
            precio: "",
            stock: "",
            imagen: "",
            categoria: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.AgregarProducto = this.AgregarProducto.bind(this);
    }

    handleChangeColor = name => event => {
        this.setState({ color: event.target.value });
    };

    handleChangeOrigen = name => event => {
        this.setState({ origen: event.target.value });
    };

    handleChangeCategoria = name => event => {
        this.setState({ categoria: event.target.value });
    };

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ nombre: "" });
        this.setState({ codigo: "" });
        this.setState({ marca: "" });
        this.setState({ color: "" });
        this.setState({ origen: "" });
        this.setState({ dimensiones: "" });
        this.setState({ descripcion: "" });
        this.setState({ precio: "" });
        this.setState({ stock: "" });
        this.setState({ imagen: "" });
        this.setState({ categoria: "" });
        this.setState({ open: true });
    };

    AgregarProducto() {
        const Nombre = this.state.nombre;
        const Codigo = this.state.codigo;
        const Marca = this.state.marca;
        const Color = this.state.color;
        const Origen = this.state.origen;
        const Dimensiones = this.state.dimensiones;
        const Descripcion = this.state.descripcion;
        const Precio = this.state.precio;
        const Stock = this.state.stock;
        const Imagen = this.state.imagen;
        const Categoria = this.state.categoria;
        if ((Codigo && Nombre && Marca && Color && Precio && Origen && Dimensiones && Descripcion && Stock && Imagen && Categoria) === "") {
            alert("Completar todos los campos por favor")
        } else {
            Agregar.agregarProducto(Codigo, Nombre, Marca, Color, Precio, Origen, Dimensiones, Descripcion, Stock, Imagen, Categoria);
            this.handleClose()
        }
    }

    render() {
        return (
            <div className="Botones">
                <Button variant="contained" color="primary" onClick={this.handleOpen}>
                    +PRODUCTO
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Crear producto</DialogTitle>
                    <DialogContent
                        style={{ width: 600 }}>
                        <TextField
                            autoComplete="fname"
                            name="nombre"
                            required
                            fullWidth
                            id="nombre"
                            label="Nombre del Producto"
                            value={this.state.nombre}
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoComplete="codigo"
                            name="codigo"
                            required
                            fullWidth
                            id="codigo"
                            label="Codigo del Producto"
                            value={this.state.codigo}
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="standard-select-color"
                            select
                            label="Color"
                            required
                            fullWidth
                            margin="normal"
                            value={this.state.color}
                            onChange={this.handleChangeColor('color')}
                        >
                            {colores.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            autoComplete="marca"
                            name="marca"
                            required
                            fullWidth
                            id="marca"
                            label="Marca"
                            value={this.state.marca}
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="standard-select-origen"
                            select
                            label="Origen"
                            fullWidth
                            margin="normal"
                            value={this.state.origen}
                            onChange={this.handleChangeOrigen('origen')}
                        >
                            {origen.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="standard-select-categoria"
                            select
                            label="Categoria"
                            fullWidth
                            margin="normal"
                            value={this.state.categoria}
                            onChange={this.handleChangeCategoria('categoria')}
                        >
                            {categoria.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            autoComplete="dimensiones"
                            name="dimensiones"
                            required
                            fullWidth
                            id="dimensiones"
                            label="Dimensiones"
                            value={this.state.dimensiones}
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoComplete="precio"
                            name="precio"
                            required
                            fullWidth
                            id="precio"
                            label="Precio"
                            value={this.state.precio}
                            onChange={this.handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            autoComplete="stock"
                            name="stock"
                            required
                            fullWidth
                            id="stock"
                            label="Stock"
                            value={this.state.stock}
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoComplete="imagen"
                            name="imagen"
                            required
                            fullWidth
                            id="imagen"
                            label="URL de la imagen del Producto"
                            value={this.state.imagen}
                            onChange={this.handleChange}
                        />
                        <TextField
                            autoComplete="descripcion"
                            name="descripcion"
                            required
                            fullWidth
                            id="descripcion"
                            label="Descripcion"
                            value={this.state.descripcion}
                            onChange={this.handleChange}
                            margin="dense"
                            multiline
                            rowsMax="4"
                            type="descripcion"
                        />
                    </DialogContent>
                    <div className="row">
                        <div className="col-5">
                            <DialogActions>
                                <Button onClick={this.handleClose} variant="contained" color="primary">
                                    Volver
                                </Button>
                            </DialogActions>
                        </div>
                        <div className="col-5">
                            <DialogActions>
                                <Button onClick={this.AgregarProducto} variant="contained" color="primary">
                                    Crear Producto
                                </Button>
                            </DialogActions>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}