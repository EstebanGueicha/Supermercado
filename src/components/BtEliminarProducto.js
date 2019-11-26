import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Eliminar from './BD/Eliminar';
import db from '../index'
import Modificar from './BD/Modificar';

class BtEliminarProducto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Codigo: this.props.codigo,
            Usuario: this.props.usuario,
            Cantidad: this.props.cantidad
        }
        this.eliminarProducto = this.eliminarProducto.bind(this)
    }

    devolverAlStock(Codigo, Cantidad) {
        var cant = Cantidad
        console.log(Codigo)
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

    eliminarProducto() {
        this.devolverAlStock(this.state.Codigo, this.state.Cantidad)
        Eliminar.eleliminarElementoCarrito(this.state.Usuario, this.state.Codigo)
    }

    render() {
        return (
            <div>
                <IconButton onClick={this.eliminarProducto} ><DeleteOutlineIcon /></IconButton>
            </div>
        );
    }
}

export default BtEliminarProducto;