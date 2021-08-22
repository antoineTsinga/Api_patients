import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';






const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(3),
      marginLeft: theme.spacing(3),
      width: '50ch',
    },
  },
}));



const adresse = { rue: '', codePostal: '', ville: '', pays: '' }
function Form({ listPatients, updateList, open, setOpen, id, setId }) {
  const classes = useStyles();
 
  const patient = { _id: 'test', nom: 'TSINGA', prenom: 'Antoine', tel: '64807421', adresse: '', avatar: '../public/logo512.png', verifie: false };


  function handleClose() {
    setOpen(false);
  };

  function ajoutPatient(e) {
    e.preventDefault();
    patient.adresse = adresse.rue + ' ' + adresse.codePostal + ' ' + adresse.ville;
    patient._id = id;
    setId(id + 1)
    checkaddress();
  }

  async function checkaddress() {
    setOpen(false)
    let adresseVerifie = false;
    var q = patient.adresse.toLowerCase();
    await axios.get("https://api-adresse.data.gouv.fr/search/?q=" + q + "&type=housenumber&autocomplete=0")
      .then(res => {
        return res.data.features;
      }).then(res => {
        var c = res[0].properties.label.toLowerCase();
        adresseVerifie = (res.length === 1 &&  c === q);
      })
      .catch(err => {
        console.log(err)
        return false
      })
    patient.verifie = adresseVerifie;
    const newList = [...listPatients, patient];
    updateList(newList);

  }


  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Entrer les informations personnelles
        </DialogContentText >
        <form className={classes.root} autoComplete="off" onSubmit={ajoutPatient}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField required id="standard-required1" label="Nom" onChange={(e) => { patient.nom = e.target.value }} />
            <TextField required id="standard-required2" label="Prénom" onChange={(e) => { patient.prenom = e.target.value }} />
            <TextField required id="standard-required3" label="Telephone" onChange={(e) => { patient.tel = e.target.value }} />
            <TextField required id="standard-required4" label="Adresse" onChange={(e) => { adresse.rue = e.target.value }} />
            <TextField required id="standard-required5" label="Code Postal" onChange={(e) => { adresse.codePostal = e.target.value }} />
            <TextField required id="standard-required6" label="Ville" onChange={(e) => { adresse.ville = e.target.value }} />
          </div>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
            </Button>
            <Button type="submit" color="primary">
              Ajouter
            </Button>
          </DialogActions>
        </form>
      </DialogContent>

    </Dialog>

  )
}
export default Form