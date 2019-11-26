import React from 'react';
import db from '../../index';

class Agregar extends React.Component {
  agregarEmpleado = (Nombre, Apellido, Dni, Puesto, FechaNac, Contrasena) => {
    db.collection("Empleado").doc(Dni).get()
      .then(doc => {
        if (!doc.exists) {
          db.collection("Empleado").doc(Dni).set({
            Nombre: Nombre,
            Apellido: Apellido,
            DNI: Dni,
            Puesto: Puesto,
            FechaNac: FechaNac,
            Contrasena: Contrasena,
          }).then(() => {
            console.log("Agregado")
          }).catch(() => {
            console.log("error")
          })
        } else {
          alert("Ya existe un Empleado con este DNI")
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }

  agregarProducto = (Codigo, Nombre, Marca, Color, Precio, Origen, Dimensiones, Descripcion, Stock, Imagen, Categoria) => {
    db.collection("Producto").doc(Codigo).get()
      .then(doc => {
        if (!doc.exists) {
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
            console.log("Agregado")
          }).catch(() => {
            console.log("error")
          })
        } else {
          alert("Ya existe un Producto con este Codigo")
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  }

  agregarCarrito = (Producto, Cantidad, Precio, Codigo, Cliente) => {
    db.collection("Carrito").doc(Cliente).collection("Almacenado").doc(Codigo).set({
      Producto: Producto,
      Cantidad: Cantidad,
      Precio: Precio,
      Codigo: Codigo,
    }).then(() => {
      console.log("Agregado")
    }).catch(() => {
      console.log("error")
    })
  }

  agregarCliente = (DNI, Nombre, Domicilio, Email, Localidad, Numero, Vencimiento, CodSeg, Cuotas, modoPago) => {
    db.collection("Cliente").doc(DNI).set({
      DNI: DNI,
      Nombre: Nombre,
      Domicilio: Domicilio,
      Email: Email,
      Localidad: Localidad,
    }
    ).then(() => {
      console.log("Agregado")
    }).catch(() => {
      console.log("error")
    })
    if (modoPago === "Debito")
      db.collection("Cliente").doc(DNI).collection("Tarjeta de debito").doc(Numero).set({
        Numero: Numero,
        Vencimiento: Vencimiento,
        CodSeg: CodSeg,
      })
    else
      if (modoPago === "Credito")
        db.collection("Cliente").doc(DNI).collection("Tarjeta de credito").doc(Numero).set({
          Numero: Numero,
          Vencimiento: Vencimiento,
          CodSeg: CodSeg,
          Cuotas: Cuotas
        })
  }

  agregarFacturacion = (id, Codigo, Fecha, Total, Cliente, CodProducto, Producto, Cantidad, Precio, modoPago, NumTarjetaDeb, NumTarjetaCre, Cuotas) => {
    if (modoPago === "Debito") {
      db.collection("Facturacion").doc("Debito").collection("Debito").doc(id).set({
        Codigo: Codigo,
        Fecha: Fecha,
        Total: Total,
        Cliente: Cliente,
        NumTarjeta: NumTarjetaDeb,
      }).then(() => {
        console.log("Agregado")
      }).catch(() => {
        console.log("error")
      })
      db.collection("Facturacion").doc("Debito").collection("Debito").doc(id).collection("Productos").doc(CodProducto).set({
        Producto: Producto,
        Cantidad: Cantidad,
        Precio: Precio,
        CodProducto: CodProducto,
      }).then(() => {
        console.log("Agregado")
      }).catch(() => {
        console.log("error")
      })
    } else {
      if (modoPago === "Credito") {
        db.collection("Facturacion").doc("Credito").collection("Credito").doc(id).set({
          Codigo: Codigo,
          Fecha: Fecha,
          Total: Total,
          Cliente: Cliente,
          NumTarjeta: NumTarjetaCre,
          Cuotas: Cuotas,
        }).then(() => {
          console.log("Agregado")
        }).catch(() => {
          console.log("error")
        })
        db.collection("Facturacion").doc("Credito").collection("Credito").doc(id).collection("Productos").doc(CodProducto).set({
          Producto: Producto,
          Cantidad: Cantidad,
          Precio: Precio,
          CodProducto: CodProducto,
        }).then(() => {
          console.log("Agregado")
        }).catch(() => {
          console.log("error")
        })
      } else {
        if (modoPago === "Efectivo") {
          db.collection("Facturacion").doc("Efectivo").collection("Efectivo").doc(id).set({
            Codigo: Codigo,
            Fecha: Fecha,
            Total: Total,
            Cliente: Cliente,
          }).then(() => {
            console.log("Agregado")
          }).catch(() => {
            console.log("error")
          })
          db.collection("Facturacion").doc("Efectivo").collection("Efectivo").doc(id).collection("Productos").doc(CodProducto).set({
            Producto: Producto,
            Cantidad: Cantidad,
            Precio: Precio,
            CodProducto: CodProducto,
          }).then(() => {
            console.log("Agregado")
          }).catch(() => {
            console.log("error")
          })
        }
      }
    }
  }
}
export default new Agregar();