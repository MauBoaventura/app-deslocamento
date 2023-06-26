/* eslint-disable react-hooks/exhaustive-deps */
import { SetStateAction, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import ListItem from 'components/atoms/List'
import { ClientesService } from '../../services/cliente';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, TextareaAutosize } from '@mui/material';

const ClientesTemplate = () => {
  const router = useRouter()
  const [rows, setRows] = useState<any[]>([])
  const [columns, setColumns] = useState<any[]>([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemDelete, setItemDelete] = useState<any>();


  useEffect(() => {
    ClientesService.getAll().then((response) => {
      setRows(response.data)
      setColumns(Object.keys(response.data[0]).map((key) => {
        const result = key.replace(/([A-Z])/g, " $1");
        const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return {
          key: key, label: finalResult
        }
      }))
    })
  }, [])

  const handleClickOpen = (id: any) => {
    setOpenDeleteDialog(true);
    setItemDelete(rows.filter((row) => row.id === id))
    
  };

  const handleDelete = () => {
    console.log(itemDelete)
    ClientesService.delete({id: itemDelete?.[0]?.id}).then((response) => {
      setRows(rows.filter((row) => row.id !== itemDelete?.[0]?.id))
    }).finally(() => {
      setOpenDeleteDialog(false);
      setItemDelete(undefined)
    })
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
    setItemDelete(undefined)
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <ListItem columns={columns} rows={rows} deleteAction={handleClickOpen}/>
      </Stack>

      <Dialog
        open={openDeleteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmação de exclusão?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Deseja realmente apagar o registro do ` + itemDelete?.[0]?.nome + `?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Não</Button>
          <Button onClick={handleDelete} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default ClientesTemplate
