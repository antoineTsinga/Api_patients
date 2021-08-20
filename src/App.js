
import './App.css';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Form from './Form.js'
import DeletePatient from './DeletePatient';
import { useState } from 'react';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '50ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

function App() {
  const[id, setId] = useState(3)
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [delete_id, setDelete_id] = useState('0');

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleClickOpen1 (idPatient) {
    setDelete_id(idPatient)
    setOpen1(true);
  };

  const [listPatients, updateList] = useState([
  { _id: 0,
    nom: 'Pierre',
    prenom: 'rick',
    tel: '0757898536',
    adresse: '9 rue de Vanves 92130 Issy-les-Moulineaux',
    verifie: true
  },
  { _id: 1,
    nom: 'TSINGA',
    prenom: 'Antoine',
    tel: '0758742556',
    adresse: '24 avenue de la porte des poissonniers 75018 paris',
    verifie: true
  },
  { _id:2,
    nom: 'Rania',
    prenom: 'Natacha',
    tel: '0705845263',
    adresse: '24 avenue acide chlorhydrique 80566 brest',
    verifie: false
  },
  ]);
  const classes = useStyles();
  
  return (
    <div className="App">
      <header className="App-header">
        <List className={classes.root} style={{height: "400px", overflow: "scroll"}}>
        {listPatients.map((patient)=>(
          <div key = {patient._id}>
          <ListItem style={{display: "flex", flexDirection:"row", justifyContent:"space-between" }}>
            <Button style={{width:"150px", marginRight: "15px"}} variant="outlined" color="primary" onClick={() => handleClickOpen1(patient._id)} startIcon={<DeleteIcon />}>
              Supprimer
            </Button >
            <ListItemText
              style={{width:"100px"}}
              primary={patient.nom + ' ' + patient.prenom}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {patient.tel}
                  </Typography>
                  {' ' + patient.adresse}
                </React.Fragment>
              }
            />
            {patient.verifie ? <CheckIcon style={{color: 'green'}}/>: <CloseIcon style={{color: 'red'}}/>}
          </ListItem>
          <Divider variant="inset" component="li" />
          </div>
        ))}
        </List>
        <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Ajouter un patient
        </Button>
        <Form listPatients={listPatients} updateList={updateList} open={open} setOpen={setOpen} id={id} setId={setId}/>
        <DeletePatient listPatients={listPatients} updateList={updateList} id={delete_id} setId={setId} open1={open1} setOpen1={setOpen1} />
      </div>
      </header>
      
    </div>
  );
}

export default App;
