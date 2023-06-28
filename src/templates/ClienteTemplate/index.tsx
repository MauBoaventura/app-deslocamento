/* eslint-disable react-hooks/exhaustive-deps */
import { SetStateAction, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import ListItem from 'components/atoms/List'
import { ClientesService } from '../../services/cliente';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Snackbar, Stack, TextField, MenuItem } from '@mui/material';
import { IClienteDTO, IClienteSaveBody, IClienteUpdateBody } from '../../services/cliente/types';
import { toast } from 'react-toastify';
import { CEPService } from '../../services/cep';

const ClientesTemplate = () => {
  const router = useRouter()
  const [cep, setCep] = useState<string>('')
  const [loading, setLoading] = useState(true)

  const [rows, setRows] = useState<any[]>([])
  const [columns, setColumns] = useState<any[]>([])

  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [itemNew, setItemNew] = useState<IClienteDTO>({} as IClienteDTO);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemDelete, setItemDelete] = useState<any>();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<IClienteDTO>({} as IClienteDTO);

  const options = [
    {
      value: 'CPF',
      label: 'CPF',
    },
    {
      value: 'CNPJ',
      label: 'CNPJ',
    },
    {
      value: 'RG',
      label: 'RG',
    },
  ];

  useEffect(() => {
    if (cep.length < 9) {
      console.log(cep)
      return
    }
    CEPService.getById(cep.replace('-', '')).then((response) => {
      setItemNew({
        ...itemNew,
        logradouro: response.data.logradouro as string,
        bairro: response.data.bairro as string,
        cidade: response.data.localidade as string,
        uf: response.data.uf as string,
      })
      setItemEdit({
        ...itemEdit,
        logradouro: response.data.logradouro as string,
        bairro: response.data.bairro as string,
        cidade: response.data.localidade as string,
        uf: response.data.uf as string,
      })
    })
  }, [cep])

  useEffect(() => {
    ClientesService.getAll().then((response) => {
      setRows(response.data)
      const c = [{ key: 'id', label: 'Id' },
      { key: 'nome', label: 'Nome' },
      { key: 'tipoDocumento', label: 'Tipo Documento' },
      { key: 'numeroDocumento', label: 'N. Documento' },
      { key: 'cidade', label: 'Cidade' },
      { key: 'logradouro', label: 'Logradouro' },
      { key: 'numero', label: 'Numero' },
      { key: 'bairro', label: 'Bairro' },
      { key: 'uf', label: 'UF' },]
      console.log(c)

      setColumns(c)
      setLoading(false)
    })
  }, [])


  const handleNew = () => {
    setOpenNewDialog(true);
    setItemNew({} as IClienteDTO)

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
    setItemNew({} as IClienteDTO)
    setItemDelete(undefined)
    setItemEdit({} as IClienteDTO)
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
      setItemEdit({} as IClienteDTO)
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
            label="Nome"
            type="text"
            fullWidth
            size='small'
            value={itemNew?.nome}
            onChange={(event) => {
              setItemNew({ ...itemNew, nome: event?.target?.value })
            }}
          />
          <Stack
            direction="row"
            // justifyContent="center"
            // alignItems="right"
            spacing={2}
          >

            <TextField
              autoFocus
              margin="dense"
              label="Tipo Documento"
              type="text"
              fullWidth
              size='small'
              value={itemNew?.tipoDocumento}
              onChange={(event) => {
                setItemNew({ ...itemNew, tipoDocumento: event?.target?.value })
              }}
              select
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              </TextField>
            <TextField
              autoFocus
              margin="dense"
              id="numeroDocumento"
              label="Número do Documento"
              type="text"
              fullWidth
              size='small'
              value={itemNew?.numeroDocumento}
              onChange={(event) => {
                console.log(event?.target?.value)
                setItemNew({ ...itemNew, numeroDocumento: event?.target?.value })
              }}
            />
          </Stack>

          <TextField
            autoFocus
            margin="dense"
            label="CEP"
            type="text"
            fullWidth
            size='small'
            value={cep}
            onChange={(event) => {
              let value = event.target.value;

              // Remove caracteres não numéricos
              value = value.replace(/\D/g, '');

              // Limita a quantidade de caracteres a 9
              if (value.length > 8) {
                value = value.slice(0, 8);
              }
              // Aplica a máscara de CEP (99999-999)
              if (value.length > 5) {
                value = value.slice(0, 5) + '-' + value.slice(5);
              }

              setCep(value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Logradouro"
            type="text"
            fullWidth
            size='small'
            value={itemNew?.logradouro}
            onChange={(event) => {
              setItemNew({ ...itemNew, logradouro: event?.target?.value })
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Número"
            type="text"
            fullWidth
            size='small'
            value={itemNew?.numero}
            onChange={(event) => {
              setItemNew({ ...itemNew, numero: event?.target?.value })
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Bairro"
            type="text"
            fullWidth
            size='small'
            value={itemNew?.bairro}
            onChange={(event) => {
              setItemNew({ ...itemNew, bairro: event?.target?.value })
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Cidade"
            type="text"
            fullWidth
            size='small'
            value={itemNew?.cidade}
            onChange={(event) => {
              setItemNew({ ...itemNew, cidade: event?.target?.value })
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="UF"
            type="text"
            fullWidth
            size='small'
            value={itemNew?.uf}
            onChange={(event) => {
              setItemNew({ ...itemNew, uf: event?.target?.value })
            }}
            InputLabelProps={{ shrink: true }}
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
            label="Nome"
            type="text"
            fullWidth
            size='small'
            value={itemEdit?.nome}
            onChange={(event) => {
              setItemEdit({ ...itemEdit, nome: event?.target?.value })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="CEP"
            type="text"
            fullWidth
            size='small'
            value={cep}
            onChange={(event) => {
              let value = event.target.value;

              // Remove caracteres não numéricos
              value = value.replace(/\D/g, '');

              // Limita a quantidade de caracteres a 9
              if (value.length > 8) {
                value = value.slice(0, 8);
              }
              // Aplica a máscara de CEP (99999-999)
              if (value.length > 5) {
                value = value.slice(0, 5) + '-' + value.slice(5);
              }

              setCep(value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Logradouro"
            type="text"
            fullWidth
            size='small'
            value={itemEdit?.logradouro}
            onChange={(event) => {
              setItemEdit({ ...itemEdit, logradouro: event?.target?.value })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Número"
            type="text"
            fullWidth
            size='small'
            value={itemEdit?.numero}
            onChange={(event) => {
              setItemEdit({ ...itemEdit, numero: event?.target?.value })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Bairro"
            type="text"
            fullWidth
            size='small'
            value={itemEdit?.bairro}
            onChange={(event) => {
              setItemEdit({ ...itemEdit, bairro: event?.target?.value })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Cidade"
            type="text"
            fullWidth
            size='small'
            value={itemEdit?.cidade}
            onChange={(event) => {
              setItemEdit({ ...itemEdit, cidade: event?.target?.value })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="UF"
            type="text"
            fullWidth
            size='small'
            value={itemEdit?.uf}
            onChange={(event) => {
              setItemEdit({ ...itemEdit, uf: event?.target?.value })
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
