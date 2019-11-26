import React from 'react';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import { InputAdornment, DialogActions, Button, Dialog, DialogTitle, Slide } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Modificar from './BD/Modificar';
import Eliminar from './BD/Eliminar';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
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

const Categoria = [
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

class DetalleProducto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
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
            openConfirmarEliminar: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleEditarProducto = this.handleEditarProducto.bind(this);
        this.handleEliminarProducto = this.handleEliminarProducto.bind(this)
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

    volverAProducto = () => {
        this.props.cerrar()
    }

    handleOpenEliminar = () => {
        this.setState({ openConfirmarEliminar: true });
    }

    handleCloseEliminar = () => {
        this.setState({ openConfirmarEliminar: false });
    };

    handleEditarProducto() {
        Modificar.modificarProducto(
            this.state.codigo,
            this.state.nombre,
            this.state.marca,
            this.state.color,
            this.state.precio,
            this.state.origen,
            this.state.dimensiones,
            this.state.descripcion,
            this.state.stock,
            this.state.imagen,
            this.state.categoria
        )
        this.volverAProducto()
    }

    actualizar() {

    }

    handleEliminarProducto() {
        Eliminar.eliminarProducto(this.state.codigo)
        this.volverAProducto()
    }

    botonesEmpleado() {
        if (this.props.modoEmpleado) {
            return (
                <div className="row">
                    <div className="col-4">
                        <DialogActions>
                            <Button onClick={this.volverAProducto} variant="contained" color="primary">
                                Volver
                            </Button>
                        </DialogActions>
                    </div>
                    <div className="col-3">
                        <DialogActions>
                            <Button onClick={this.handleEditarProducto} variant="contained" color="primary">
                                Editar
                            </Button>
                        </DialogActions>
                    </div>
                    <div className="col-3">
                        <DialogActions>
                            <Button onClick={this.handleOpenEliminar} variant="contained" color="primary">
                                Eliminar
                            </Button>
                        </DialogActions>
                    </div>
                </div>
            )
        }
    }

    render() {
        let nuevaImagen;
        if (this.props.modoEmpleado) {
            nuevaImagen = <TextField
                autoComplete="imagen"
                name="imagen"
                required
                fullWidth
                id="imagen"
                label="URL de la Nueva Imagen del Producto"
                value={this.state.imagen}
                onChange={this.handleChange}
            />
        } else {
            nuevaImagen = ""
        }
        return (
            <DialogContent style={{ width: 600 }}>
                <TextField
                    id="codigo"
                    label="Codigo de producto"
                    defaultValue={this.state.codigo}
                    InputProps={{
                        readOnly: true,
                    }}
                    fullWidth
                />
                <div className="row">
                    <div className="col-6 panels-on-modal">
                        <img src={this.state.imagen} id="poster-en-modal" name="flyer" alt={this.state.nombre} title="" />
                    </div>
                    <div className="col-6 panels-on-modal">
                        <div className="right-textfields-on-modal">
                            <TextField
                                name="nombre"
                                label="Nombre del Producto"
                                value={this.state.nombre}
                                onChange={this.handleChange}
                                InputProps={{
                                    readOnly: !this.props.modoEmpleado,
                                }}
                                fullWidth
                            />
                        </div>
                        <div className="right-textfields-on-modal">
                            <TextField
                                id="standard-select-color"
                                select
                                label="Color"
                                name="color"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    readOnly: !this.props.modoEmpleado,
                                }}
                                value={this.state.color}
                                onChange={this.handleChangeColor('color')}
                            >
                                {colores.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="right-textfields-on-modal">
                            <TextField
                                name="marca"
                                label="Marca"
                                value={this.state.marca}
                                onChange={this.handleChange}
                                InputProps={{
                                    readOnly: !this.props.modoEmpleado,
                                }}
                                fullWidth
                            />
                            <div className="right-textfields-on-modal">
                                <TextField
                                    name="origen"
                                    select
                                    label="Origen"
                                    fullWidth
                                    margin="normal"
                                    value={this.state.origen}
                                    InputProps={{
                                        readOnly: !this.props.modoEmpleado,
                                    }}
                                    onChange={this.handleChangeOrigen('origen')}
                                >
                                    {origen.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="right-textfields-on-modal">
                                <TextField
                                    name="categoria"
                                    select
                                    label="Categoria"
                                    fullWidth
                                    margin="normal"
                                    value={this.state.categoria}
                                    InputProps={{
                                        readOnly: !this.props.modoEmpleado,
                                    }}
                                    onChange={this.handleChangeCategoria('categoria')}
                                >
                                    {Categoria.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="right-textfields-on-modal">
                                <TextField
                                    name="dimensiones"
                                    label="Dimensiones"
                                    value={this.state.dimensiones}
                                    onChange={this.handleChange}
                                    InputProps={{
                                        readOnly: !this.props.modoEmpleado,
                                    }}
                                    fullWidth
                                />
                            </div>
                            <div className="right-textfields-on-modal">
                                <TextField
                                    name="precio"
                                    label="Precio"
                                    value={this.state.precio}
                                    onChange={this.handleChange}
                                    InputProps={{
                                        readOnly: !this.props.modoEmpleado,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                $
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                />
                            </div>
                            <div className="right-textfields-on-modal">
                                <TextField
                                    name="stock"
                                    label="Stock"
                                    value={this.state.stock}
                                    onChange={this.handleChange}
                                    InputProps={{
                                        readOnly: !this.props.modoEmpleado,
                                    }}
                                    fullWidth
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <TextField
                    autoFocus
                    margin="dense"
                    name="descripcion"
                    label="Descripcion"
                    value={this.state.descripcion}
                    onChange={this.handleChange}
                    InputProps={{
                        readOnly: !this.props.modoEmpleado,
                    }}
                    multiline
                    rowsMax="4"
                    type="descripcion"
                    fullWidth
                />
                {nuevaImagen}
                {this.botonesEmpleado()}
                <Dialog
                    open={this.state.openConfirmarEliminar}
                    onClose={this.handleCloseEliminar}
                    TransitionComponent={Transition}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">¿Seguro que desea eliminar este producto?</DialogTitle>
                    <div className="row">
                        <div className="col-5">
                            <DialogActions>
                                <Button onClick={this.handleCloseEliminar} variant="contained" color="primary">
                                    Cancelar
                                </Button>
                            </DialogActions>
                        </div>
                        <div className="col-5">
                            <DialogActions>
                                <Button onClick={this.handleEliminarProducto} variant="contained" color="primary">
                                    Aceptar
                                </Button>
                            </DialogActions>
                        </div>
                    </div>
                </Dialog>
            </DialogContent>
        );
    }
}
export default DetalleProducto;