import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, Grid } from '@material-ui/core';

export default class ButtonAppBar extends React.Component {
  render() {
    return (
      <div >
        <AppBar position="static" style={{ marginBottom: "10px" }}>
          <Toolbar>
            <Grid container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Button color="inherit" onClick={this.props.callbackkProductos} >Promociones</Button>
              <Button color="inherit" onClick={this.props.callbackkProductos}  >Productos</Button>
              <Button color="inherit" onClick={this.props.callbackkProductos} >Sucursales</Button>
              <Button color="inherit" onClick={this.props.callbackkProductos} >Ayuda</Button>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}