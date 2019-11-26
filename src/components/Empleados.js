import React from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@material-ui/core';
import Modificar from './BD/Modificar';
import Eliminar from './BD/Eliminar';

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class Producto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openEdit: false,
            openDelete: false,
            nombre: this.props.nombre,
            apellido: this.props.apellido,
            dni: this.props.dni,
            puesto: this.props.puesto,
            fechaNac: this.props.fechaNac,
        }
        this.handleChange = this.handleChange.bind(this)
        this.EliminarEmpleado = this.EliminarEmpleado.bind(this)
        this.ModificarEmpleado = this.ModificarEmpleado.bind(this)
    }

    handleOpenEdit = () => {
        this.setState({ openEdit: true });
    }

    handleCloseEdit = () => {
        this.setState({ openEdit: false });
    };

    handleOpenDelete = () => {
        this.setState({ openDelete: true });
    }

    handleCloseDelete = () => {
        this.setState({ openDelete: false });
    };

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    EliminarEmpleado() {
        Eliminar.eliminarEmpleado(this.state.dni);
    }

    ModificarEmpleado() {
        const Nombre = this.state.nombre;
        const Apellido = this.state.apellido;
        const DNI = this.state.dni;
        const Puesto = this.state.puesto;
        const FechaNac = this.state.fechaNac;
        Modificar.modificarEmpleado(Nombre, Apellido, DNI, Puesto, FechaNac);
        this.handleCloseEdit();
    }

    render() {
        let nombreApellido = this.state.nombre + " " + this.state.apellido;
        return (
            <div>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={nombreApellido}
                        secondary={this.state.puesto}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="edit" onClick={this.handleOpenEdit}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={this.handleOpenDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Dialog
                    open={this.state.openEdit}
                    onClose={this.handleCloseEdit}
                    TransitionComponent={Transition}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Detalles del Empleado</DialogTitle>
                    <div>
                        <div className="textfields-on-modal-empleados">
                            <TextField
                                id="DNI"
                                label="DNI"
                                defaultValue={this.state.dni}
                                fullWidth
                            />
                        </div>
                        <div className="textfields-on-modal-empleados">
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
                        </div>
                        <div className="textfields-on-modal-empleados">
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
                        </div>
                        <div className="textfields-on-modal-empleados">
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
                        </div>
                        <div className="textfields-on-modal-empleados">
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
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <DialogActions>
                                    <Button onClick={this.handleCloseEdit} variant="contained" color="primary">
                                        Volver
                                </Button>
                                </DialogActions>
                            </div>
                            <div className="col-5">
                                <DialogActions>
                                    <Button onClick={this.ModificarEmpleado} variant="contained" color="primary">
                                        Guardar
                                </Button>
                                </DialogActions>
                            </div>
                        </div>
                    </div>
                </Dialog>
                <Dialog
                    open={this.state.openDelete}
                    onClose={this.handleCloseDelete}
                    TransitionComponent={Transition}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Eliminar Perfil</DialogTitle>
                    <DialogContentText>
                        ¿Esta seguro que desea eliminar el perfil de {this.state.nombre} {this.state.apellido}?
                    </DialogContentText>
                    <div className="row">
                        <div className="col-5">
                            <DialogActions>
                                <Button onClick={this.handleCloseDelete} variant="contained" color="primary">
                                    Cancelar
                                </Button>
                            </DialogActions>
                        </div>
                        <div className="col-5">
                            <DialogActions>
                                <Button onClick={this.EliminarEmpleado} variant="contained" color="primary">
                                    Eliminar
                                </Button>
                            </DialogActions>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}
export default Producto;