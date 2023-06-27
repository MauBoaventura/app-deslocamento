/* eslint-disable react-hooks/exhaustive-deps */
import { SetStateAction, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import ListItem from 'components/atoms/List'
import { CondutorService } from '../../services/condutor';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar, Stack, TextField, TextareaAutosize } from '@mui/material';
import { ICondutorDTO, ICondutorSaveBody, ICondutorUpdateBody } from '../../services/condutor/types';
import { toast } from 'react-toastify';
import Head from 'next/head';

const CondutoresTemplate = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const [rows, setRows] = useState<any[]>([])
  const [columns, setColumns] = useState<any[]>([])

  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [itemNew, setItemNew] = useState<ICondutorDTO>({} as ICondutorDTO);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemDelete, setItemDelete] = useState<any>();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<ICondutorDTO>({} as ICondutorDTO);


  useEffect(() => {
    CondutorService.getAll().then((response) => {
      const c = [{ "key": "id", "label": "Id" },
      { "key": "nome", "label": "Nome" },
      { "key": "numeroHabilitacao", "label": "Numero Habilitacao" },
      { "key": "catergoriaHabilitacao", "label": "Catergoria Habilitacao" },
      { "key": "vencimentoHabilitacao", "label": "Vencimento Habilitacao" }]

      setColumns(c)
      setRows(response.data)
      setLoading(false)
    })
  }, [])


  const handleNew = () => {
    setOpenNewDialog(true);
    setItemNew({} as ICondutorDTO)

  };

  const handleSave = () => {
    const data: ICondutorSaveBody = {
      nome: itemNew?.nome,
      numeroHabilitacao: itemNew?.numeroHabilitacao,
      categoriaHabilitacao: itemNew?.catergoriaHabilitacao,
      vencimentoHabilitacao: itemNew?.vencimentoHabilitacao,
    }
    CondutorService.save(data).then((response) => {
      setRows([...rows, { ...data, id: response?.data }])
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
    CondutorService.delete({ id: itemDelete?.[0]?.id }).then((response) => {
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
    setItemNew({} as ICondutorDTO)
    setItemDelete(undefined)
    setItemEdit({} as ICondutorDTO)
  };

  const handleClickEdit = (id: any) => {
    setOpenEditDialog(true);
    setItemEdit(rows.filter((row) => row.id === id)[0])
  };

  const handleEdit = () => {
    const data: ICondutorUpdateBody = {
      id: itemEdit?.id,
      vencimentoHabilitacao: itemEdit?.vencimentoHabilitacao,
      categoriaHabilitacao: itemEdit?.catergoriaHabilitacao,
    }
    CondutorService.update({ id: itemEdit?.id ?? 0 }, data).then((response) => {
      setRows(rows.map((row) => {
        if (row.id === itemEdit?.id) {
          console.log(itemEdit)
          return {
            ...row,
            catergoriaHabilitacao: itemEdit?.catergoriaHabilitacao,
            vencimentoHabilitacao: itemEdit?.vencimentoHabilitacao,
          }
        }
        return row
      }))
      toast('Registro alterado com sucesso!', { type: 'success' })
    }).finally(() => {
      setOpenEditDialog(false);
      setItemEdit({} as ICondutorDTO)
    })
  };

  return (
    <>
      <Head>
        <title>SGD Naty - Condutor</title>
      </Head>
      <Stack
        direction="column"
        // justifyContent="center"
        // alignItems="right"
        spacing={2}
      >
        <Grid container justifyContent="flex-end" marginRight={'16px'}>
          <Button onClick={handleNew} color='success' variant='contained' >
            Iniciar Deslocamento
          </Button>
        </Grid>

        {loading ? 
        <Grid container justifyContent="center" margin={'16px'} minHeight={'200px'} alignItems={'center'}>
          <CircularProgress />
        </Grid>
          :
          <ListItem columns={columns} rows={rows} deleteAction={handleClickDelete} editAction={handleClickEdit}/>
        }
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
            id="placa"
            label="Nome"
            type="text"
            fullWidth
            variant="standard"
            value={itemNew?.nome}
            onChange={(event) => {
              console.log(event?.target?.value)
              setItemNew({ ...itemNew, nome: event?.target?.value })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Número Habilitação (CNH)"
            type="text"
            fullWidth
            variant="standard"
            value={itemNew?.numeroHabilitacao}
            onChange={(event) => {
              setItemNew({ ...itemNew, numeroHabilitacao: event?.target?.value })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Categoria Habilitação"
            type="text"
            fullWidth
            variant="standard"
            value={itemNew?.catergoriaHabilitacao}
            onChange={(event) => {
              setItemNew({ ...itemNew, catergoriaHabilitacao: event?.target?.value })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Vencimento Habilitacao"
            type="date"
            fullWidth
            variant="standard"
            value={itemNew?.vencimentoHabilitacao}
            onChange={(event) => {
              setItemNew({ ...itemNew, vencimentoHabilitacao: (event?.target?.value) })
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
            label="Marca Modelo"
            type="text"
            fullWidth
            variant="standard"
            value={itemEdit?.catergoriaHabilitacao}
            onChange={(event) => {
              setItemEdit({ ...itemEdit, catergoriaHabilitacao: event?.target?.value })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Ano Fabricacao"
            type="text"
            fullWidth
            variant="standard"
            value={itemEdit?.vencimentoHabilitacao}
            onChange={(event) => {
              setItemEdit({ ...itemEdit, vencimentoHabilitacao: event?.target?.value })
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

export default CondutoresTemplate
