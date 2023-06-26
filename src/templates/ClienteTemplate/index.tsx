/* eslint-disable react-hooks/exhaustive-deps */
import { SetStateAction, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import ListItem from 'components/atoms/List'
import { ClientesService } from '../../services/cliente';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, TextareaAutosize } from '@mui/material';
import { IClienteDTO, IClienteUpdateBody } from '../../services/cliente/types';

const ClientesTemplate = () => {
  const router = useRouter()
  const [rows, setRows] = useState<any[]>([])
  const [columns, setColumns] = useState<any[]>([])

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemDelete, setItemDelete] = useState<any>();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<IClienteDTO>();


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

  const handleClickDelete = (id: any) => {
    setOpenDeleteDialog(true);
    setItemDelete(rows.filter((row) => row.id === id))

  };

  const handleDelete = () => {
    console.log(itemDelete)
    ClientesService.delete({ id: itemDelete?.[0]?.id }).then((response) => {
      setRows(rows.filter((row) => row.id !== itemDelete?.[0]?.id))
    }).finally(() => {
      setOpenDeleteDialog(false);
      setItemDelete(undefined)
    })
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
    setOpenEditDialog(false);
    setItemDelete(undefined)
    setItemEdit(undefined)
  };

  const handleClickEdit = (id: any) => {
    setOpenEditDialog(true);
    setItemEdit(rows.filter((row) => row.id === id)[0])

  };

  const handleEdit = () => {
    console.log(itemEdit)
    const data: IClienteUpdateBody = {
      id: itemEdit?.id as number,
      nome: itemEdit?.nome,
      logradouro: itemEdit?.logradouro,
      numero: itemEdit?.numero,
      bairro: itemEdit?.bairro,
      cidade: itemEdit?.cidade,
      uf: itemEdit?.uf,
    }
    ClientesService.update({ id: itemEdit?.id ?? 0 }, data).then((response) => {
      setRows(rows.map((row) => {
        if (row.id === itemEdit?.id) {
          return {
            ...row,
            ...data
          }
        }
        return row
      }))
    }).finally(() => {
      setOpenEditDialog(false);
      setItemEdit(undefined)
    })
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <ListItem columns={columns} rows={rows} deleteAction={handleClickDelete} editAction={handleClickEdit} />
      </Stack>

      {/* Delete Dialog */}
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

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Editar:"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            fullWidth
            variant="standard"
            value={itemEdit?.nome}
            onChange={(event) => {
              setItemEdit(itemEdit ? { ...itemEdit, nome: event?.target?.value } : undefined)
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Logradouro"
            type="text"
            fullWidth
            variant="standard"
            value={itemEdit?.logradouro}
            onChange={(event) => {
              setItemEdit(itemEdit ? { ...itemEdit, logradouro: event?.target?.value } : undefined)
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Número"
            type="text"
            fullWidth
            variant="standard"
            value={itemEdit?.numero}
            onChange={(event) => {
              setItemEdit(itemEdit ? { ...itemEdit, numero: event?.target?.value } : undefined)
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Bairro"
            type="text"
            fullWidth
            variant="standard"
            value={itemEdit?.bairro}
            onChange={(event) => {
              setItemEdit(itemEdit ? { ...itemEdit, bairro: event?.target?.value } : undefined)
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cidade"
            type="text"
            fullWidth
            variant="standard"
            value={itemEdit?.cidade}
            onChange={(event) => {
              setItemEdit(itemEdit ? { ...itemEdit, cidade: event?.target?.value } : undefined)
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="UF"
            type="text"
            fullWidth
            variant="standard"
            value={itemEdit?.uf}
            onChange={(event) => {
              setItemEdit(itemEdit ? { ...itemEdit, uf: event?.target?.value } : undefined)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleEdit} autoFocus>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default ClientesTemplate
