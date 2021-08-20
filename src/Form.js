import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));



  
function Form({listPatients, updateList, open, setOpen, id, setId}){
    const classes = useStyles();
    const patient = {_id:'test', nom: 'TSINGA', prenom: 'Antoine', tel:'64807421', adresse:'', verifie:false};
    function handleClose (){
        setOpen(false);
    };

    function ajoutPatient(e){
        e.preventDefault();
        patient._id=id;
        setId(id + 1)
        checkaddress();
    }

    async function checkaddress(){
        let ici = false;
        const q = patient.adresse.toLowerCase();
        console.log(q)
        await axios.get("https://api-adresse.data.gouv.fr/search/?q="+ q +"&type=&type=housenumber&autocomplete=0street&autocomplete=0")
          .then(res => {
            return res.data.features.length === 1;
          }).then(res =>  {
                ici = res;
                })
          .catch(err => {
              console.log(err)
              return false
            })
        patient.verifie = ici
        console.log(patient.verifie)
        const newList = [...listPatients, patient];
        updateList(newList);
        setOpen(false)
    }
        
    
    return(
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <form className={classes.root} autoComplete="off" onSubmit={ajoutPatient}>
                <TextField required id="standard-required1" label="Nom" onChange={(e) => {patient.nom = e.target.value}}/>
                <TextField required id="standard-required2" label="Prénom" onChange={(e) => {patient.prenom = e.target.value}}/>
                <TextField required id="standard-required3" label="Telephone" onChange={(e) => {patient.tel = e.target.value}}/>
                <TextField required id="standard-required4" label="adresse" onChange={(e) => {patient.adresse = e.target.value}}/>
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