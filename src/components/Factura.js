import React from 'react';
import { IconButton, Dialog, DialogContent, Typography, Grid } from '@material-ui/core';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import db from '../index';

class Factura extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      id: this.props.id,
      modoReporte: this.props.modoReporte,
      itemProductos: [],
      open: false,
      email: "",
      direccion: "",
      localidad: "",
      nombre: "",
    }
    this.handleOpen = this.handleOpen.bind(this);
  }

  componentDidMount() {
    db.collection("Facturacion").doc(this.state.modoReporte).collection(this.state.modoReporte).doc(this.state.id).collection("Productos")
      .onSnapshot((snapShots) => {
        this.setState({
          itemProductos: snapShots.docs.map(doc => {
            console.log(doc.data())
            return { id: doc.id, data: doc.data() }
          })
        })
      }, error => {
        console.log(error)
      });
    this.buscarCliente()
  }

  buscarCliente() {
    const dni = this.state.item.Cliente
    var consulta = db.collection("Cliente").where('DNI', '==', dni)
    consulta.get()
      .then(snapshot => {
        if (snapshot.empty) {
          return;
        }
        snapshot.forEach(doc => {
          this.setState({ email: doc.data().Email })
          this.setState({ direccion: doc.data().Domicilio })
          this.setState({ localidad: doc.data().Localidad })
          this.setState({ nombre: doc.data().Nombre })
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const productos = this.state.itemProductos
    return (
      <div>
        <IconButton onClick={this.handleOpen} ><FindInPageIcon /></IconButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="md">
          <DialogContent dividers>
            <Typography variant="h3">Factura </Typography>
            <Typography variant="h5">Fecha {this.state.item.Fecha} </Typography>
            <Grid
              container
              direction="row"
              justify="flex-start"
            >
              <Grid item md={6}>
                <Typography variant="h5">Datos Cliente</Typography>
                <Typography variant="subtitle1"> {this.state.nombre}</Typography>
                <Typography variant="subtitle1">DNI: {this.state.item.Cliente}</Typography>
                <Typography variant="subtitle1">E-mail  {this.state.email}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="h5">Enviar A</Typography>
                <Typography variant="subtitle1">Localidad: {this.state.localidad}</Typography>
                <Typography variant="subtitle1">Direccion: {this.state.direccion}</Typography>
              </Grid>
              <Grid item md={2} >
                <Typography variant="h6">Cantidad</Typography>
                {productos.map(item => (
                  <div key={item.id}>
                    <Typography variant="subtitle1">{item.data.Cantidad}</Typography>
                  </div>
                ))}
              </Grid>
              <Grid item md={6} >
                <Typography variant="h6">Descripcion</Typography>
                {productos.map(item => (
                  <div key={item.id}>
                    <Typography variant="subtitle1">{item.data.Producto}</Typography>
                  </div>
                ))}
              </Grid>
              <Grid item md={2} >
                <Typography variant="h6">Precio unitario</Typography>
                {productos.map(item => (
                  <div key={item.id}>
                    <Typography variant="subtitle1">${item.data.Precio}</Typography>
                  </div>
                ))}
              </Grid>
              <Grid item md={2} >
                <Typography variant="h6">Importe</Typography>
                {productos.map(item => (
                  <div key={item.id}>
                    <Typography variant="subtitle1">${item.data.Precio * item.data.Cantidad}</Typography>
                  </div>
                ))}
              </Grid>
              <Grid item md={10}>
                <Typography variant="h6">Total</Typography>
              </Grid>
              <Grid item md={2}>
                <Typography variant="h6">${this.state.item.Total}</Typography>
              </Grid>
              <Grid item md={12}>
                <Typography variant="h6">Pagado con {this.state.modoReporte} </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default Factura;