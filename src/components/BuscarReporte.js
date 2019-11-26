import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import db from '../index'
import { DialogTitle } from '@material-ui/core';
import Factura from './Factura';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

class Reportes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            itemEfectivo: [],
            itemDebito: [],
            itemCredito: [],
            total: "",
            Cliente: this.props.cliente,
            fechabusc: this.props.fechabusc,
            openBuscar: false,
            modoReporte: this.props.modoReporte
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        var consultaEfectivo = db.collection("Facturacion").doc("Efectivo").collection("Efectivo").where("Fecha", "==", this.state.fechabusc)
        consultaEfectivo.onSnapshot((snapShots) => {
            this.setState({
                itemEfectivo: snapShots.docs.map(doc => {
                    console.log(doc.data())
                    return { id: doc.id, data: doc.data() }
                })
            })
        }, error => {
            console.log(error)
        });
        var consultaDebito = db.collection("Facturacion").doc("Debito").collection("Debito").where("Fecha", "==", this.state.fechabusc)
        consultaDebito.onSnapshot((snapShots) => {
            this.setState({
                itemDebito: snapShots.docs.map(doc => {
                    console.log(doc.data())
                    return { id: doc.id, data: doc.data() }
                })
            })
        }, error => {
            console.log(error)
        });
        var consultaCredito = db.collection("Facturacion").doc("Credito").collection("Credito").where("Fecha", "==", this.state.fechabusc)
        consultaCredito.onSnapshot((snapShots) => {
            this.setState({
                itemCredito: snapShots.docs.map(doc => {
                    console.log(doc.data())
                    return { id: doc.id, data: doc.data() }
                })
            })
        }, error => {
            console.log(error)
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCloseCarritoModal = () => {
        this.props.close();
    };

    render() {
        const transaccionesEfectivo = this.state.itemEfectivo
        const transaccionesDebito = this.state.itemDebito
        const transaccionesCredito = this.state.itemCredito
        var cantTotal = 0;
        var contado = 0;
        var debito = 0;
        var credito = 0;
        transaccionesEfectivo.map(item => (
            <div key={item.id}>
                {cantTotal = cantTotal + (item.data.Total)}
                {contado = contado + (item.data.Total)}
            </div>
        ))
        transaccionesDebito.map(item => (
            <div key={item.id}>
                {cantTotal = cantTotal + (item.data.Total)}
                {debito = debito + (item.data.Total)}
            </div>
        ))
        transaccionesCredito.map(item => (
            <div key={item.id}>
                {cantTotal = cantTotal + (item.data.Total)}
                {credito = credito + (item.data.Total)}
            </div>
        ))
        if (this.state.modoReporte === "Fecha") {
            return (
                <div>
                    <DialogContent dividers>
                        <DialogTitle>Reporte de la fecha {this.state.fechabusc} </DialogTitle>
                        <Paper style={{
                            width: '100%',
                            marginTop: 30,
                            overflowX: 'auto',
                        }
                        }>
                            <Table style={{
                                minWidth: 500,
                            }}>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>ID Transaction</StyledTableCell>
                                        <StyledTableCell align="right">Fecha</StyledTableCell>
                                        <StyledTableCell align="right">Monto</StyledTableCell>
                                        <StyledTableCell align="right">Monto Contado</StyledTableCell>
                                        <StyledTableCell align="right">Monto Credito</StyledTableCell>
                                        <StyledTableCell align="right">Monto Debito</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transaccionesEfectivo.map(item => (
                                        <StyledTableRow key={item.id}>
                                            <StyledTableCell component="th" scope="row">
                                                {item.data.Codigo}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{item.data.Fecha}</StyledTableCell>
                                            <StyledTableCell align="center">$ {item.data.Total}</StyledTableCell>
                                            <StyledTableCell align="center">$ {item.data.Total}</StyledTableCell>
                                            <StyledTableCell align="center">- </StyledTableCell>
                                            <StyledTableCell align="center">- </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                    {transaccionesDebito.map(item => (
                                        <StyledTableRow key={item.id}>
                                            <StyledTableCell component="th" scope="row">
                                                {item.data.Codigo}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{item.data.Fecha}</StyledTableCell>
                                            <StyledTableCell align="center">$ {item.data.Total}</StyledTableCell>
                                            <StyledTableCell align="center">-</StyledTableCell>
                                            <StyledTableCell align="center">-</StyledTableCell>
                                            <StyledTableCell align="center">$ {item.data.Total}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                    {transaccionesCredito.map(item => (
                                        <StyledTableRow key={item.id}>
                                            <StyledTableCell component="th" scope="row">
                                                {item.data.Codigo}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{item.data.Fecha}</StyledTableCell>
                                            <StyledTableCell align="center">$ {item.data.Total}</StyledTableCell>
                                            <StyledTableCell align="center">-</StyledTableCell>
                                            <StyledTableCell align="center">$ {item.data.Total}</StyledTableCell>
                                            <StyledTableCell align="center">- </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row">
                                            Total Final
                                        </StyledTableCell>
                                        <StyledTableCell align="center"> </StyledTableCell>
                                        <StyledTableCell align="center">${cantTotal}</StyledTableCell>
                                        <StyledTableCell align="center"> ${contado} </StyledTableCell>
                                        <StyledTableCell align="right">${credito}</StyledTableCell>
                                        <StyledTableCell align="right">${debito}</StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseCarritoModal} color="primary" variant="contained">
                            Volver
                    </Button>
                    </DialogActions>
                </div>
            );
        } else {
            if (this.state.modoReporte === "Efectivo") {
                return (
                    <div>
                        <DialogContent dividers>
                            <DialogTitle>Reporte de la fecha {this.state.fechabusc} en Contado </DialogTitle>
                            <Paper style={{
                                width: '100%',
                                marginTop: 30,
                                overflowX: 'auto',
                            }
                            }>
                                <Table style={{
                                    minWidth: 500,
                                }}>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>ID Transaction</StyledTableCell>
                                            <StyledTableCell align="right">Fecha</StyledTableCell>
                                            <StyledTableCell align="right">Monto</StyledTableCell>
                                            <StyledTableCell align="right">Cliente</StyledTableCell>
                                            <StyledTableCell align="right">Factura</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {transaccionesEfectivo.map(item => (
                                            <StyledTableRow key={item.id}>
                                                <StyledTableCell component="th" scope="row">
                                                    {item.data.Codigo}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{item.data.Fecha}</StyledTableCell>
                                                <StyledTableCell align="center">$ {item.data.Total}</StyledTableCell>
                                                <StyledTableCell align="center">DNI {item.data.Cliente}</StyledTableCell>
                                                <StyledTableCell align="center"><Factura id={item.id} modoReporte={this.state.modoReporte} item={item.data} /></StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        <StyledTableRow >
                                            <StyledTableCell component="th" scope="row">
                                                Total Final
                                                </StyledTableCell>
                                            <StyledTableCell align="center"> </StyledTableCell>
                                            <StyledTableCell align="center">${contado}</StyledTableCell>
                                        </StyledTableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseCarritoModal} color="primary" variant="contained">
                                Volver
                            </Button>
                        </DialogActions>
                    </div>
                )
            } else {
                if (this.state.modoReporte === "Debito") {
                    return (
                        <div>
                            <DialogContent dividers>
                                <DialogTitle>Reporte de la fecha {this.state.fechabusc} en Debito </DialogTitle>
                                <Paper style={{
                                    width: '100%',
                                    marginTop: 30,
                                    overflowX: 'auto',
                                }
                                }>
                                    <Table style={{
                                        minWidth: 500,
                                    }}>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>ID Transaction</StyledTableCell>
                                                <StyledTableCell align="right">Fecha</StyledTableCell>
                                                <StyledTableCell align="right">Monto</StyledTableCell>
                                                <StyledTableCell align="right">Cliente</StyledTableCell>
                                                <StyledTableCell align="right">Numero de Tarjeta</StyledTableCell>
                                                <StyledTableCell align="right">Factura</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {transaccionesDebito.map(item => (
                                                <StyledTableRow key={item.id}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {item.data.Codigo}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{item.data.Fecha}</StyledTableCell>
                                                    <StyledTableCell align="center">$ {item.data.Total}</StyledTableCell>
                                                    <StyledTableCell align="center">DNI {item.data.Cliente}</StyledTableCell>
                                                    <StyledTableCell align="center">{item.data.NumTarjeta}</StyledTableCell>
                                                    <StyledTableCell align="center"><Factura id={item.id} modoReporte={this.state.modoReporte} item={item.data} /></StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                            <StyledTableRow >
                                                <StyledTableCell component="th" scope="row">
                                                    Total Final
                                                    </StyledTableCell>
                                                <StyledTableCell align="center"> </StyledTableCell>
                                                <StyledTableCell align="center">${debito}</StyledTableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleCloseCarritoModal} color="primary" variant="contained">
                                    Volver
                                </Button>
                            </DialogActions>
                        </div>
                    )
                } else {
                    if (this.state.modoReporte === "Credito") {
                        return (
                            <div>
                                <DialogContent dividers>
                                    <DialogTitle>Reporte de la fecha {this.state.fechabusc} en Credito </DialogTitle>
                                    <Paper style={{
                                        width: '100%',
                                        marginTop: 30,
                                        overflowX: 'auto',
                                    }
                                    }>
                                        <Table style={{
                                            minWidth: 500,
                                        }}>
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>ID Transaction</StyledTableCell>
                                                    <StyledTableCell align="right">Fecha</StyledTableCell>
                                                    <StyledTableCell align="right">Monto</StyledTableCell>
                                                    <StyledTableCell align="right">Cliente</StyledTableCell>
                                                    <StyledTableCell align="right">Numero de Tarjeta</StyledTableCell>
                                                    <StyledTableCell align="right">Cuotas</StyledTableCell>
                                                    <StyledTableCell align="right">Factura</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {transaccionesCredito.map(item => (
                                                    <StyledTableRow key={item.id}>
                                                        <StyledTableCell component="th" scope="row">
                                                            {item.data.Codigo}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">{item.data.Fecha}</StyledTableCell>
                                                        <StyledTableCell align="center">$ {item.data.Total}</StyledTableCell>
                                                        <StyledTableCell align="center">DNI {item.data.Cliente}</StyledTableCell>
                                                        <StyledTableCell align="center">{item.data.NumTarjeta}</StyledTableCell>
                                                        <StyledTableCell align="center">{item.data.Cuotas}</StyledTableCell>
                                                        <StyledTableCell align="center"><Factura id={item.id} modoReporte={this.state.modoReporte} item={item.data} /></StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                                <StyledTableRow >
                                                    <StyledTableCell component="th" scope="row">
                                                        Total Final
                                                        </StyledTableCell>
                                                    <StyledTableCell align="center"> </StyledTableCell>
                                                    <StyledTableCell align="center">${credito}</StyledTableCell>
                                                </StyledTableRow>
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleCloseCarritoModal} color="primary" variant="contained">
                                        Volver
                                    </Button>
                                </DialogActions>
                            </div>
                        )
                    }
                }
            }
        }
    }
}
export default Reportes;