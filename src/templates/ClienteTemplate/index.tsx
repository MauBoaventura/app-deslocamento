/* eslint-disable react-hooks/exhaustive-deps */
import { SetStateAction, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import ListItem from 'components/atoms/List'
import { ClientesService } from '../../services/cliente';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar, Stack, TextField, TextareaAutosize } from '@mui/material';
import { IClienteDTO, IClienteSaveBody, IClienteUpdateBody } from '../../services/cliente/types';
import { toast } from 'react-toastify';

const ClientesTemplate = () => {
  const router = useRouter()
  const [rows, setRows] = useState<any[]>([])
  const [columns, setColumns] = useState<any[]>([])

  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [itemNew, setItemNew] = useState<IClienteDTO>();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemDelete, setItemDelete] = useState<any>();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<IClienteDTO>();


  useEffect(() => {
    ClientesService.getAll().then((response) => {
      setRows(response.data)
      const c = [{ key: 'id', label: 'Id' },
      { key: 'numeroDocumento', label: 'N. Documento' },
      { key: 'tipoDocumento', label: 'Tipo Documento' },
      { key: 'nome', label: 'Nome' },
      { key: 'logradouro', label: 'Logradouro' },
      { key: 'numero', label: 'Numero' },
      { key: 'bairro', label: 'Bairro' },
      { key: 'cidade', label: 'Cidade' },
      { key: 'uf', label: 'UF' },]
      console.log(c)

      setColumns(c)
      // setColumns(Object.keys(response.data[0]).map((key) => {
      //   const result = key.replace(/([A-Z])/g, " $1");
      //   const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
      //   return {
      //     key: key, label: finalResult
      //   }
      // }))
    })
  }, [])


  const handleNew = () => {
    setOpenNewDialog(true);
    setItemNew({
      id: 0
      , numeroDocumento: ''
      , tipoDocumento: ''
      , nome: ''
      , logradouro: ''
      , numero: ''
      , bairro: ''
      , cidade: ''
      , uf: ''
    })

  };

  const handleSave = () => {
    const data: IClienteSaveBody = {
      numeroDocumento: itemNew?.numeroDocumento,
      tipoDocumento: itemNew?.tipoDocumento,
      nome: itemNew?.nome,
      logradouro: itemNew?.logradouro,
      numero: itemNew?.numero,
      bairro: itemNew?.bairro,
      cidade: itemNew?.cidade,
      uf: itemNew?.uf,
    }
    ClientesService.save(data).then((response) => {
      setRows([...rows, {...data, id: response?.data}])
      toast('Registro salvo com sucesso!', { type: 'success' })
    }).finally(() => {
      handleClose()
    })
  };

  const handleClickDelete = (id: any) => {
    setOpenDeleteDialog(true);
    setItemDelete(rows.filter((row) => row.id === id))

  };

  const handleDelete = () => {
    console.log(itemDelete)
    ClientesService.delete({ id: itemDelete?.[0]?.id }).then((response) => {
      setRows(rows.filter((row) => row.id !== itemDelete?.[0]?.id))
      toast('Registro apagado!', { type: 'error' })
    }).finally(() => {
      setOpenDeleteDialog(false);
      setItemDelete(undefined)
    })
  };

  const handleClose = () => {
    setOpenNewDialog(false);
    setOpenDeleteDialog(false);
    setOpenEditDialog(false);
    setItemNew(undefined)
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
      toast('Registro alterado com sucesso!', { type: 'success' })
    }).finally(() => {
      setOpenEditDialog(false);
      setItemEdit(undefined)
    })
  };

  return (
    <>
      <Stack
        direction="column"
        // justifyContent="center"
        // alignItems="right"
        spacing={2}
      >
        <Grid container justifyContent="flex-end" marginRight={'16px'}>
          <Button onClick={handleNew} color='success' variant='contained' >
            Novo
          </Button>
        </Grid>

       
        <ListItem columns={columns} rows={rows} deleteAction={handleClickDelete} editAction={handleClickEdit} />
      </Stack>

      {/* New Dialog */}
      <Dialog
        open={openNewDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Novo:"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="numeroDocumento"
            label="Número do Documento"
            type="text"
            fullWidth
            variant="standard"
            value={itemNew?.numeroDocumento}
            onChange={(event) => {
              console.log(event?.target?.value)
              setItemNew(itemNew ? { ...itemNew, numeroDocumento: event?.target?.value } : undefined)
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tipo Documento"
            type="text"
            fullWidth
            variant="standard"
            value={itemNew?.tipoDocumento}
            onChange={(event) => {
              setItemNew(itemNew ? { ...itemNew, tipoDocumento: event?.target?.value } : undefined)
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            fullWidth
            variant="standard"
            value={itemNew?.nome}
            onChange={(event) => {
              setItemNew(itemNew ? { ...itemNew, nome: event?.target?.value } : undefined)
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
            value={itemNew?.logradouro}
            onChange={(event) => {
              setItemNew(itemNew ? { ...itemNew, logradouro: event?.target?.value } : undefined)
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
            value={itemNew?.numero}
            onChange={(event) => {
              setItemNew(itemNew ? { ...itemNew, numero: event?.target?.value } : undefined)
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
            value={itemNew?.bairro}
            onChange={(event) => {
              setItemNew(itemNew ? { ...itemNew, bairro: event?.target?.value } : undefined)
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
            value={itemNew?.cidade}
            onChange={(event) => {
              setItemNew(itemNew ? { ...itemNew, cidade: event?.target?.value } : undefined)
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
            value={itemNew?.uf}
            onChange={(event) => {
              setItemNew(itemNew ? { ...itemNew, uf: event?.target?.value } : undefined)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave} autoFocus>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

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
