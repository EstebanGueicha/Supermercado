import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import db from '../index';
import Agregar from './BD/Agregar';

const cbu = 1230000000117;
//const url = "https://bancaservice.azurewebsites.net/api/integration/transferir?movimientos=[{";
const url = "https://bancaservice.azurewebsites.net/api/integration/transferir";
//const urlt = "https://tarjetacredito.azurewebsites.net/movimientos/registrar";
const urlt = "http://tarjetaback.herokuapp.com/movimientos/registrar";

const modoPago = [
    {
        value: 'Efectivo',
        label: 'Efectivo',
    },
    {
        value: 'Debito',
        label: 'Debito',
    },
    {
        value: 'Credito',
        label: 'Credito',
    },
];

const meses = [
    {
        value: '01',
        label: '01',
    },
    {
        value: '02',
        label: '02',
    },
    {
        value: '03',
        label: '03',
    },
    {
        value: '04',
        label: '04',
    },
    {
        value: '05',
        label: '05',
    },
    {
        value: '06',
        label: '06',
    },
    {
        value: '07',
        label: '07',
    },
    {
        value: '08',
        label: '08',
    },
    {
        value: '09',
        label: '09',
    },
    {
        value: '10',
        label: '10',
    },
    {
        value: '11',
        label: '11',
    },
    {
        value: '12',
        label: '12',
    },
];

const año = [
    {
        value: '19',
        label: '19',
    },
    {
        value: '20',
        label: '20',
    },
    {
        value: '21',
        label: '21',
    },
    {
        value: '22',
        label: '22',
    },
    {
        value: '23',
        label: '23',
    },
    {
        value: '24',
        label: '24',
    },
    {
        value: '25',
        label: '25',
    },
];

const cuotas = [
    {
        value: '1',
        label: '1',
    },
    {
        value: '3',
        label: '3',
    },
    {
        value: '6',
        label: '6',
    },
    {
        value: '12',
        label: '12',
    },
];

class ModalDatosUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            item: [],
            itemProductos: this.props.productos,
            total: this.props.total,
            user: null,
            modoPago: "Efectivo",
            Dni: "",
            direccion: "",
            localidad: "",
            cbuOrigen: "",
            numTarjCred: "",
            mes: "11",
            año: "19",
            codSeg: "",
            codigo: 0,
            cuotas: "1",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCompraRealizada = this.handleCompraRealizada.bind(this)
    }

    componentWillMount() {
        const email = this.props.user.email
        var consulta = db.collection("Cliente").where('Email', '==', email)
        consulta.get()
            .then(snapshot => {
                if (snapshot.empty) {
                    return;
                }
                snapshot.forEach(doc => {
                    this.setState({ Dni: doc.data().DNI })
                    this.setState({ direccion: doc.data().Domicilio })
                    this.setState({ localidad: doc.data().Localidad })
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    handleChangeModoPago = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleCloseDatosModal = () => {
        this.props.handleCloseDatosModal();
    }

    handleVolverDeDatosModal = () => {
        this.props.handleVolverDeDatosModal();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    buscarCodFacturas() {
        var numero = 0
        db.collection("Facturacion").doc(this.state.modoPago).collection(this.state.modoPago).orderBy('Codigo', 'desc').limit(1).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }
                snapshot.forEach(doc => {
                    numero = parseInt(doc.data().Codigo, 10)
                    this.facturar(numero)
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    vaciarCarrito = () => {
        this.props.vaciar()
    }

    handleCompraRealizada() {
        if ((this.state.Dni && this.state.direccion && this.state.localidad) === "")
            alert("completar Todos los datos por favor")
        else
            if (this.state.modoPago === "Efectivo") {
                Agregar.agregarCliente(this.state.Dni, this.props.user.displayName, this.state.direccion, this.props.user.email, this.state.localidad, "", "", "", "", this.state.modoPago)
                this.buscarCodFacturas()
                this.vaciarCarrito()
            } else {
                if (this.state.modoPago === "Credito")
                    if ((this.state.codSeg && this.state.numTarjCred) === "")
                        alert("Completar los datos de la tarjeta por favor")
                    else {
                        Agregar.agregarCliente(this.state.Dni, this.props.user.displayName, this.state.direccion, this.props.user.email, this.state.localidad, this.state.numTarjCred, this.state.año + "/" + this.state.mes, this.state.codSeg, this.state.cuotas, this.state.modoPago)
                        const endpoint = `${urlt}`;
                        //console.log("URL: " + urlt);
                        //console.log("ENDPOINT: " + endpoint);
                        let data = { nroTarjeta: this.state.numTarjCred, codSeg: this.state.codSeg, monto: this.state.total, idEntidad: 4, cuotas: this.state.cuotas }
                        //console.log("Tarjeta: " + data.nroTarjeta);
                        //console.log("Codigo: " + data.codSeg);
                        //console.log("Monto: " + data.monto);
                        //console.log("Cuotas: " + data.cuotas);
                        fetch(endpoint, {
                            method: 'POST', // or 'PUT'
                            body: JSON.stringify(data), // data can be `string` or {object}!
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then((response) => {
                                //console.log("Resp: " + response);
                                return response.json();
                            })
                            .then(responseData => {
                                if (responseData.Response !== '') {
                                    if (responseData === 'El proceso de compra se realizo con exito') {
                                        alert("Compra realizada con exito");
                                        this.buscarCodFacturas();
                                        this.vaciarCarrito()
                                    } else {
                                        alert(responseData);
                                    }
                                } else {
                                    alert("No se pudo contactar a la entidad crediticia");
                                }
                            });
                    }
                else {
                    if ((this.state.cbuOrigen) === "")
                        alert("Completar los datos por favor")
                    else {
                        Agregar.agregarCliente(this.state.Dni, this.props.user.displayName, this.state.direccion, this.props.user.email, this.state.localidad, this.state.cbuOrigen, this.state.año + "/" + this.state.mes, this.state.codSeg, "", this.state.modoPago)
                        //const endpoint = `${url}"cbuOrigen":"${this.state.cbuOrigen}","cbuDestino":"${cbu}","monto":${this.state.total},"descripcion":"Pago del cliente al super"}]&user=uadefour&origenMovimiento=origen1`;
                        const endpoint = `${url}`;
                        let data = {
                            "movimientos": "[{\"cbuOrigen\":\""+this.state.cbuOrigen+"\",\"cbuDestino\":\""+cbu+"\",\"monto\":\""+this.state.total+"\",\"descripcion\":\"Pago del cliente al super\"}]",
                            "user": "uadefour",
                            "origenMovimiento": "origen1"
                        }
                        //console.log("DATA: " + data.movimientos);
                        //console.log("DATA: " + data.movimientos.cbuDestino);
                        //console.log("DATA: " + data.movimientos.monto);
                        //console.log("DATA: " + data.movimientos.descripcion);
                        //console.log("DATA: " + data.user);
                        //console.log("DATA: " + data.origenMovimiento);
                        //console.log("CBU: " + cbu);
                        //console.log("URL: " + url);
                        //console.log("ENDPOINT: " + endpoint);
                        fetch(endpoint, {
                            method: 'POST', // or 'PUT'
                            //body: JSON.stringify(false), // data can be `string` or {object}!
                            body: JSON.stringify(data), // data can be `string` or {object}!
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then((response) => {
                                return response.json();
                            })
                            .then(responseData => {
                                if (responseData.Response !== '') {
                                    if (responseData.error === '') {
                                        alert("Compra realizada con exito");
                                        this.buscarCodFacturas();
                                        this.vaciarCarrito()
                                    } else {
                                        alert(responseData.error);
                                    }
                                } else {
                                    alert("No se pudo contactar al banco");
                                }
                            });
                    }
                }
            }
    }

    pad(n) {
        return n < 10 ? '0' + n : n;
    }

    facturar(numero) {
        const productos = this.state.itemProductos
        var currentDate = new Date();
        var date = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        var fecha = year + "-" + this.pad(month + 1) + "-" + date;
        numero++
        var id = numero.toString();
        productos.map(item => (
            Agregar.agregarFacturacion(id, numero, fecha, this.state.total, this.state.Dni, item.data.Codigo, item.data.Producto, item.data.Cantidad, item.data.Precio, this.state.modoPago, this.state.cbuOrigen, this.state.numTarjCred, this.state.cuotas)
        ))
        this.handleCloseDatosModal()
    }

    camposPago() {
        if (this.state.modoPago === "Efectivo") {
            return (
                <div>
                </div>
            );
        } else {
            if (this.state.modoPago === "Credito") {
                return (
                    <div>
                        <DialogTitle id="form-dialog-title">Datos Tarjeta Credito</DialogTitle>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="numTarjCred"
                            label="Numero Tarjeta de Credito"
                            value={this.state.numTarjCred}
                            onChange={this.handleChange}
                            type="Tarjeta"
                            fullWidth
                        />
                        <TextField
                            id="select-meses"
                            select
                            label="Mes"
                            name="mes"
                            margin="normal"
                            value={this.state.mes}
                            onChange={this.handleChange}
                        >
                            {meses.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="select-Año"
                            select
                            label="Año"
                            name="año"
                            margin="normal"
                            value={this.state.año}
                            onChange={this.handleChange}
                        >
                            {año.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="codSeg"
                            label="Codigo Seguridad tarjeta de Credito"
                            value={this.state.codSeg}
                            onChange={this.handleChange}
                            type="text"
                            fullWidth
                            inputProps={{
                                maxLength: "3"
                            }}
                        />
                        <TextField
                            id="select-Cuotas"
                            select
                            label="Cuotas"
                            name="cuotas"
                            margin="normal"
                            value={this.state.cuotas}
                            onChange={this.handleChange}
                        >
                            {cuotas.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                )
            } else {
                return (
                    <div>
                        <DialogTitle id="form-dialog-title">Datos Tarjeta Debito</DialogTitle>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="cbuOrigen"
                            label="CBU"
                            value={this.state.cbuOrigen}
                            onChange={this.handleChange}
                            type="Tarjeta"
                            fullWidth
                            inputProps={{
                                maxLength: "13"
                            }}
                        />
                    </div>
                )
            }
        }
    }

    render() {
        return (
            <div>
                <DialogTitle id="form-dialog-title">Datos Cliente</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="Nombre"
                        label="Nombre"
                        defaultValue={this.props.user.displayName}
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="Correo Electronico"
                        label="Correo Electronico"
                        defaultValue={this.props.user.email}
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="Dni"
                        label="Dni"
                        value={this.state.Dni}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="direccion"
                        label="Direccion"
                        value={this.state.direccion}
                        onChange={this.handleChange}
                        type="Direccion"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="localidad"
                        label="Localidad"
                        value={this.state.localidad}
                        onChange={this.handleChange}
                        type="Localidad"
                        fullWidth
                    />
                    <DialogTitle id="form-dialog-title">Total A Pagar ${this.state.total}</DialogTitle>
                    <TextField
                        id="select-modoPago"
                        select
                        label="Modo de Pago"
                        required
                        fullWidth
                        margin="normal"
                        defaultValue={this.props.modoPago}
                        value={this.state.modoPago}
                        onChange={this.handleChangeModoPago('modoPago')}
                    >
                        {modoPago.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    {this.camposPago()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseDatosModal} color="secondary" variant="contained">
                        Cancelar
                        </Button>
                    <Button onClick={this.handleVolverDeDatosModal} color="primary" variant="contained">
                        Volver
                        </Button>
                    <Button onClick={this.handleCompraRealizada} color="primary" variant="contained">
                        Comprar
                        </Button>
                </DialogActions>
            </div>
        );
    }
}
export default ModalDatosUser;