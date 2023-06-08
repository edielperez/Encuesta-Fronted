import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Fab, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { URL_BASE } from '../utils/conection';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const FormSurvey = () => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()
    axios.post(URL_BASE + 'survey/', { title: name, description })
      .then(() => {
        console.log('Respuesta guardadas correctamente');
      })
      .catch(error => {
        console.error('Error al registrar respuesta:', error);
      });
    handleClose()
    window.location.reload();

  }

  return (
    <div>
      <Fab color="primary" aria-label="add">
        <AddIcon onClick={handleClickOpen} />
      </Fab>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create Survey
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>

            <TextField label="Name Survey" id="margin-normal" margin="normal" value={name} onChange={e => setName(e.target.value)} fullWidth required />
            <TextField label="Description" id="margin-normal" margin="normal" value={description} onChange={e => setDescription(e.target.value)} fullWidth multiline required />

          </DialogContent>
          <DialogActions>
            <Button autoFocus type='submit'>
              Save
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}
export default FormSurvey