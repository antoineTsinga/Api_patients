import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function DeletePatient({listPatients, updateList, open1, setOpen1, id}) {
  const handleClose1 = () => {
    setOpen1(false);
    console.log(id)
  };

  function deleteChoice(){

     const newList = listPatients.filter( pat => pat._id !== id );
        updateList(newList);
        setOpen1(false)
  }

  return (
    <div>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Supprimer un patient?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vous êtes sur le point de supprimer un patient, voulez-vous vraiment le faire?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="primary">
            Non
          </Button>
          <Button onClick={deleteChoice} color="primary" autoFocus>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default DeletePatient