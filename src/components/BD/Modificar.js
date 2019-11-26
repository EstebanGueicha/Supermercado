import React from 'react';
import db from '../../index';

class Modificar extends React.Component {
  modificarEmpleado = (Nombre, Apellido, Dni, Puesto, FechaNac) => {
    db.collection("Empleado").doc(Dni).set({
      Nombre: Nombre,
      Apellido: Apellido,
      DNI: Dni,
      Puesto: Puesto,
      FechaNac: FechaNac,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }

  modificarProducto = (Codigo, Nombre, Marca, Color, Precio, Origen, Dimensiones, Descripcion, Stock, Imagen, Categoria) => {
    db.collection("Producto").doc(Codigo).set({
      Codigo: Codigo,
      Nombre: Nombre,
      Marca: Marca,
      Color: Color,
      Precio: Precio,
      Origen: Origen,
      Dimensiones: Dimensiones,
      Descripcion: Descripcion,
      Stock: Stock,
      Imagen: Imagen,
      Categoria: Categoria
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }

  modificarStock = (Codigo, Stock) => {
    db.collection("Producto").doc(Codigo).set({
      Codigo: Codigo,
      Stock: Stock,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }

  modificarCarrito = (Cantidad, Cliente, Producto) => {
    db.collection("Carrito").set({
      Cantidad: Cantidad,
      Cliente: Cliente,
      Producto: Producto,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }

  modificarCliente = (DNI, Nombre, Apellido, Domicilio, Email, TarjetaCredito, TarjetaDebito) => {
    db.collection("Cliente").doc(DNI).set({
      DNI: DNI,
      Nombre: Nombre,
      Apellido: Apellido,
      Domicilio: Domicilio,
      Email: Email,
      TarjetaCredito: TarjetaCredito,
      TarjetaDebito: TarjetaDebito,
    }).then(() => {
      console.log("Modificado")
    }).catch(() => {
      console.log("error")
    })
  }
}
export default new Modificar();