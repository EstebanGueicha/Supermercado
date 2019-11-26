import React, { Component } from 'react';
import { Grid, TextField, Button, MenuItem, Typography } from '@material-ui/core';
import Agregar from './BD/Agregar'

const Puesto = [
    {
        value: 'Presidente',
        label: 'Presidente',
    },
    {
        value: 'VicePresidente',
        label: 'VicePresidente',
    },
    {
        value: 'RRHH',
        label: 'RRHH',
    },
    {
        value: 'Cajero',
        label: 'Cajero',
    },
];

class BotonAgregarEmpleado extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            apellido: "",
            dni: "",
            fechaNac: "2019-01-01",
            puesto: "",
            contrasena: ""
        }
        this.AgregarEmpleado = this.AgregarEmpleado.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.nuevaContrasena = this.nuevaContrasena.bind(this)
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    //Agrega empleado
    AgregarEmpleado() {
        const Nombre = this.state.nombre;
        const Apellido = this.state.apellido;
        const DNI = this.state.dni;
        const Puesto = this.state.puesto;
        const FechaNac = this.state.fechaNac;
        const Contrasena = this.state.contrasena
        if ((Nombre && Apellido && DNI && Puesto && FechaNac) === "") {
            alert("Completar todos los campos por favor")
        } else {
            Agregar.agregarEmpleado(Nombre, Apellido, DNI, Puesto, FechaNac, Contrasena);
            this.handleCloseNuevoEmpleado()
        }
    }

    handleCloseNuevoEmpleado = () => {
        this.props.closeNuevoEmpleado();
    }

    nuevaContrasena() {
        const nombre = this.state.nombre
        const dni = this.state.dni
        const contra = dni + nombre
        this.setState({ contrasena: contra })
        alert("La contraseña de " + nombre + this.state.apellido + " es " + contra)
    }

    render() {
        return (
            <Grid container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={10}>
                    <TextField
                        autoComplete="dni"
                        name="dni"
                        required
                        fullWidth
                        id="dni"
                        label="DNI"
                        value={this.state.dni}
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        autoComplete="fname"
                        name="nombre"
                        required
                        fullWidth
                        id="nombre"
                        label="Nombre"
                        value={this.state.nombre}
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        autoComplete="apellido"
                        name="apellido"
                        required
                        fullWidth
                        id="apellido"
                        label="Apellido"
                        value={this.state.apellido}
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        autoComplete="fechaNac"
                        name="fechaNac"
                        required
                        fullWidth
                        id="fechaNac"
                        label="Fecha De Nacimiento"
                        type="date"
                        value={this.state.fechaNac}
                        onChange={this.handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        autoComplete="puesto"
                        name="puesto"
                        select
                        required
                        fullWidth
                        id="puesto"
                        label="Puesto"
                        value={this.state.puesto}
                        onChange={this.handleChange}
                    >
                        {Puesto.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={10}>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={7}>
                            <TextField
                                autoComplete="contrasena"
                                name="contrasena"
                                id="contrasena"
                                label="Contraseña"
                                fullWidth
                                value={this.state.contrasena}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <Button onClick={this.nuevaContrasena} variant="contained" color="secondary" size="small"><Typography variant="body2" component="p">Generar Contraseña</Typography></Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Button onClick={this.handleCloseNuevoEmpleado} variant="contained" color="primary">
                        Volver
                    </Button>
                </Grid>
                <Button onClick={this.AgregarEmpleado} variant="contained" color="primary">
                    Guardar
                </Button>
            </Grid>
        );
    }
}

export default BotonAgregarEmpleado;