/* eslint-disable react-hooks/exhaustive-deps */
import { SetStateAction, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import ListItem from 'components/atoms/List'
import { VeiculosService } from '../../services/veiculo';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar, Stack, TextField, TextareaAutosize } from '@mui/material';
import { IVeiculoDTO, IVeiculoSaveBody, IVeiculoUpdateBody } from '../../services/veiculo/types';
import { toast } from 'react-toastify';
import Head from 'next/head';

const VeiculosTemplate = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const [rows, setRows] = useState<any[]>([])
  const [columns, setColumns] = useState<any[]>([])

  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [itemNew, setItemNew] = useState<IVeiculoDTO>({} as IVeiculoDTO);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemDelete, setItemDelete] = useState<any>();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<IVeiculoDTO>({} as IVeiculoDTO);


  useEffect(() => {
    VeiculosService.getAll().then((response) => {
      const c = [{ "key": "id", "label": "Id" },
      { "key": "placa", "label": "Placa" },
      { "key": "marcaModelo", "label": "Marca Modelo" },
      { "key": "anoFabricacao", "label": "Ano Fabricacao" },
      { "key": "kmAtual", "label": "Km Atual" }]

      setColumns(c)
      setRows(response.data)
      setLoading(false)
    })
  }, [])


  const handleNew = () => {
    setOpenNewDialog(true);
    setItemNew({} as IVeiculoDTO)

  };

  const handleSave = () => {
    const data: IVeiculoSaveBody = {
      placa: itemNew?.placa,
      marcaModelo: itemNew?.marcaModelo,
      anoFabricacao: itemNew?.anoFabricacao,
      kmAtual: itemNew?.kmAtual,
    }
    VeiculosService.save(data).then((response) => {
      setRows([...rows, { ...data, id: response?.data }])
      toast('Registro salvo com sucesso!', { type: 'success' })
    })
      .catch((error) => { toast('Erro ao salvar registro!', { type: 'error' }) })
      .finally(() => {
        handleClose()
      })
  };

  const handleClickDelete = (id: any) => {
    setOpenDeleteDialog(true);
    setItemDelete(rows.filter((row) => row.id === id))

  };

  const handleDelete = () => {
    console.log(itemDelete)
    VeiculosService.delete({ id: itemDelete?.[0]?.id }).then((response) => {
      setRows(rows.filter((row) => row.id !== itemDelete?.[0]?.id))
      toast('Registro apagado!', { type: 'error' })
    })
      .catch((error) => { toast('Erro ao apagar registro!', { type: 'error' }) })
      .finally(() => {
        setOpenDeleteDialog(false);
        setItemDelete(undefined)
      })
  };

  const handleClose = () => {
    setOpenNewDialog(false);
    setOpenDeleteDialog(false);
    setOpenEditDialog(false);
    setItemNew({} as IVeiculoDTO)
    setItemDelete(undefined)
    setItemEdit({} as IVeiculoDTO)
  };

  const handleClickEdit = (id: any) => {
    setOpenEditDialog(true);
    setItemEdit(rows.filter((row) => row.id === id)[0])
  };

  const handleEdit = () => {
    console.log(itemEdit)
    const data: IVeiculoUpdateBody = {
      id: itemEdit?.id,
      marcaModelo: itemEdit?.marcaModelo,
      anoFabricacao: itemEdit?.anoFabricacao,
      kmAtual: itemEdit?.kmAtual,
    }
    VeiculosService.update({ id: itemEdit?.id ?? 0 }, data).then((response) => {
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
    })
      .catch((error) => { toast('Erro ao alterar registro!', { type: 'error' }) })
      .finally(() => {
        setOpenEditDialog(false);
        setItemEdit({} as IVeiculoDTO)
      })
  };

  return (
    <>
      <Head>
        <title>SGD Naty - Veiculos</title>
      </Head>
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

        {loading ?
          <Grid container justifyContent="center" margin={'16px'} minHeight={'200px'} alignItems={'center'}>
            <CircularProgress />
          </Grid>
          :
          <ListItem columns={columns} rows={rows} deleteAction={handleClickDelete} editAction={handleClickEdit} />
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
            label="Placa"
            type="text"
            fullWidth
            variant="standard"
            value={itemNew?.placa}
            onChange={(event) => {
              let value = event.target.value.toUpperCase();

              // Remove caracteres não permitidos
              value = value.replace(/[^A-Z0-9]/g, '');
          
              // Limita a quantidade de caracteres a 7
              if (value.length > 7) {
                value = value.slice(0, 7);
              }
          
              // Aplica a máscara de placa
              if (value.length > 3) {
                if (value.length === 4) {
                  // Formato da placa antiga (AAA-9999)
                  value = value.slice(0, 3) + '-' + value.slice(3);
                } else {
                  // Formato da placa nova (AAA9A99)
                  value = value.slice(0, 3) + value.slice(3, 4) + '-' + value.slice(4);
                }
              }
              setItemNew({ ...itemNew, placa: value })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Marca Modelo"
            type="text"
            fullWidth
            variant="standard"
            value={itemNew?.marcaModelo}
            onChange={(event) => {
              setItemNew({ ...itemNew, marcaModelo: event?.target?.value })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Ano Fabricacao"
            type="text"
            fullWidth
            variant="standard"
            value={itemNew?.anoFabricacao}
            onChange={(event) => {
              setItemNew({ ...itemNew, anoFabricacao: parseInt(event?.target?.value) })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="KM Atual"
            type="text"
            fullWidth
            variant="standard"
            value={itemNew?.kmAtual}
            onChange={(event) => {
              setItemNew({ ...itemNew, kmAtual: parseInt(event?.target?.value) })
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
            {`Deseja realmente apagar o registro do ` + itemDelete?.[0]?.placa + `?`}
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

            label="Marca Modelo"
            type="text"
            fullWidth
            variant="standard"
            value={itemEdit?.marcaModelo}
            onChange={(event) => {
              setItemEdit({ ...itemEdit, marcaModelo: event?.target?.value })
            }}
          />
          <TextField
            autoFocus
            margin="dense"

            label="Ano Fabricacao"
            type="text"
            fullWidth
            variant="standard"
            value={itemEdit?.anoFabricacao}
            onChange={(event) => {
              setItemEdit({ ...itemEdit, anoFabricacao: parseInt(event?.target?.value) })
            }}
          />
          <TextField
            autoFocus
            margin="dense"

            label="Número"
            type="text"
            fullWidth
            variant="standard"
            value={itemEdit?.kmAtual}
            onChange={(event) => {
              setItemEdit({ ...itemEdit, kmAtual: parseInt(event?.target?.value) })
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

export default VeiculosTemplate
