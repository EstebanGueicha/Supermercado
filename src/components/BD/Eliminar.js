import React from 'react';
import db from '../../index';

class Eliminar extends React.Component {
    eliminarEmpleado(id) {
        db.collection("Empleado").doc(id).delete()
    }

    eliminarProducto(id) {
        db.collection("Producto").doc(id).delete()
    }

    eliminarCliente(id) {
        db.collection("Cliente").doc(id).delete()
    }

    /*eliminarCarrito(id){
        db.collection("Carrito").doc(id).collection("Almacenado").delete()
    }*/

    eleliminarElementoCarrito(cliente, id) {
        db.collection("Carrito").doc(cliente).collection("Almacenado").doc(id).delete()
    }
}
export default new Eliminar();