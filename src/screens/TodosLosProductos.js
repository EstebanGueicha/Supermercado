import React, { Component } from 'react';
import db from '../index';
import Producto from '../components/Producto';
import { Grid, Paper } from '@material-ui/core';
import ProductoBus from '../components/ProductoBus';
import Paneles from '../components/Paneles';

class TodosLosProductos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      modoEmpleadoActivo: this.props.modoEmpleadoActivo,
      modoClienteActivo: this.props.modoClienteActivo,
      modoCompraActivo: this.props.modoCompraActivo,
      categorias: "Todos",
      origen: "Todos",
      colores: "Todos",
      buscado: this.props.filtroProducto,
      Cantidad: 0,
      user: this.props.user
    };
  }

  callbackCategorias = (data) => {
    this.setState({ categorias: data })
    this.componentDidMount()
  }

  callbackOrigen = (data) => {
    this.setState({ origen: data })
    this.componentDidMount()
  }

  callbackColores = (data) => {
    this.setState({ colores: data })
    this.componentDidMount()
  }

  componentDidMount() {
    var filtro = db.collection("Producto")
    if (this.state.buscado !== "")
      filtro = db.collection("Producto").where("Nombre", "==", this.state.buscado)
    else
      if (this.state.categorias !== "Todos" && this.state.origen !== "Todos" && this.state.colores !== "Todos")
        filtro = db.collection("Producto").where("Categoria", "==", this.state.categorias).where("Origen", "==", this.state.origen).where("Color", "==", this.state.colores)
      else
        if (this.state.origen !== "Todos" && this.state.categorias !== "Todos")
          filtro = db.collection("Producto").where("Origen", "==", this.state.origen).where("Categoria", "==", this.state.categorias)
        else
          if (this.state.colores !== "Todos" && this.state.categorias !== "Todos")
            filtro = db.collection("Producto").where("Color", "==", this.state.colores).where("Categoria", "==", this.state.categorias)
          else
            if (this.state.colores !== "Todos" && this.state.origen !== "Todos")
              filtro = db.collection("Producto").where("Color", "==", this.state.colores).where("Origen", "==", this.state.origen)
            else
              if (this.state.categorias !== "Todos")
                filtro = db.collection("Producto").where("Categoria", "==", this.state.categorias)
              else
                if (this.state.origen !== "Todos")
                  filtro = db.collection("Producto").where("Origen", "==", this.state.origen)
                else
                  if (this.state.colores !== "Todos")
                    filtro = db.collection("Producto").where("Color", "==", this.state.colores)
    filtro.onSnapshot((snapShots) => {
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

  render() {
    const producto = this.state.item;
    if (this.state.modoCompraActivo === true) {
      return (
        <Grid container
          direction="row"
          justify="space-evenly"
          style={{ marginTop: "10%" }}
        >
          <Grid item xs="auto" md={2} >
            <Paneles
              categorias={this.state.categorias}
              origen={this.state.origen}
              colores={this.state.colores}
              callbackCategorias={this.callbackCategorias}
              callbackOrigen={this.callbackOrigen}
              callbackColores={this.callbackColores}
            />
          </Grid>
          <Grid item md={8}>
            <Grid container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={2}
            >
              {producto.map(item => (
                <Grid item xs="auto" md="auto" key={item.id}>
                  <ProductoBus
                    nombre={item.data.Nombre}
                    codigo={item.data.Codigo}
                    marca={item.data.Marca}
                    color={item.data.Color}
                    origen={item.data.Origen}
                    dimensiones={item.data.Dimensiones}
                    descripcion={item.data.Descripcion}
                    precio={item.data.Precio}
                    stock={item.data.Stock}
                    imagen={item.data.Imagen}
                    categoria={item.data.Categoria}
                    modoCliente={this.state.modoClienteActivo}
                    user={this.props.user}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )
    } else {
      if (this.state.modoEmpleadoActivo === true) {
        return (
          <Grid container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            {producto.map(item => (
              <Grid item md={3} key={item.id}>
                <Paper >
                  <Producto
                    nombre={item.data.Nombre}
                    codigo={item.data.Codigo}
                    marca={item.data.Marca}
                    color={item.data.Color}
                    origen={item.data.Origen}
                    dimensiones={item.data.Dimensiones}
                    descripcion={item.data.Descripcion}
                    precio={item.data.Precio}
                    stock={item.data.Stock}
                    imagen={item.data.Imagen}
                    categoria={item.data.Categoria}
                    modoEmpleado={this.state.modoEmpleadoActivo}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        )
      }
    }
  }
}

export default TodosLosProductos;