import React from 'react';
import '../App.css';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DetalleProducto from './DetalleProducto';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class Producto extends React.Component {
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
            modoEmpleado: this.props.modoEmpleado,
            modoCliente: this.props.modoEmpleado,
            openConfirmarEliminar: false
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.nombre !== prevProps.nombre) {
            this.setState({ nombre: this.props.nombre });
        }
        if (this.props.marca !== prevProps.marca) {
            this.setState({ marca: this.props.marca });
        }
        if (this.props.color !== prevProps.color) {
            this.setState({ color: this.props.color });
        }
        if (this.props.origen !== prevProps.origen) {
            this.setState({ origen: this.props.origen });
        }
        if (this.props.dimensiones !== prevProps.dimensiones) {
            this.setState({ dimensiones: this.props.dimensiones });
        }
        if (this.props.descripcion !== prevProps.descripcion) {
            this.setState({ descripcion: this.props.descripcion });
        }
        if (this.props.precio !== prevProps.precio) {
            this.setState({ precio: this.props.precio });
        }
        if (this.props.stock !== prevProps.stock) {
            this.setState({ stock: this.props.stock });
        }
        if (this.props.imagen !== prevProps.imagen) {
            this.setState({ imagen: this.props.imagen });
        }
        if (this.props.categoria !== prevProps.categoria) {
            this.setState({ categoria: this.props.categoria });
        }
    }

    BuscarDetalles = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    noStock() {
        if (this.state.stock === 0) {
            return (
                <div className="col-12 titulo">
                    <h4 className="text-white bg-danger ">NO Hay stock</h4>
                </div>
            )
        }
        else {
            return (
                <div className="col-12 titulo">
                    <h5>Stock: {this.state.stock}</h5>
                </div>
            )
        }
    }

    render() {
        return (
            <div className=" producto">
                <div className="flyer" >
                    <div className="row img-flyer">
                        <div className="col-12">
                            <img src={this.state.imagen} name="flyer" alt={this.state.nombre} title="" onClick={() => this.BuscarDetalles()} />
                        </div>
                    </div>
                    <div className="col-12 titulo">
                        <h5>{this.state.nombre}</h5>
                    </div>
                    {this.noStock()}
                </div>
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
                        cerrar={this.handleClose}
                    />
                </Dialog>
            </div>
        );
    }
}
export default Producto;