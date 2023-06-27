/* eslint-disable react-hooks/exhaustive-deps */
import { SetStateAction, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import ListItem from 'components/atoms/List'
import { DeslocamentoService } from '../../services/deslocamento';
import { Autocomplete, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FilledTextFieldProps, Grid, OutlinedTextFieldProps, Snackbar, Stack, StandardTextFieldProps, TextField, TextFieldVariants, TextareaAutosize } from '@mui/material';
import { IDeslocamentoDTO, IDeslocamentoSaveBody, IDeslocamentoUpdateBody } from '../../services/deslocamento/types';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { IClienteDTO } from '../../services/cliente/types';
import { ClientesService } from '../../services/cliente';
import { CondutorService } from '../../services/condutor';
import { VeiculosService } from '../../services/veiculo';
import { IVeiculoDTO } from '../../services/veiculo/types';
import { ICondutorDTO } from '../../services/condutor/types';
import { format } from 'date-fns';

const DeslocamentoesTemplate = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const [rows, setRows] = useState<any[]>([])
  const [columns, setColumns] = useState<any[]>([])
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [itemNew, setItemNew] = useState<IDeslocamentoDTO>({} as IDeslocamentoDTO);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemDelete, setItemDelete] = useState<any>();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<IDeslocamentoDTO>({} as IDeslocamentoDTO);


  useEffect(() => {
    DeslocamentoService.getAll().then((response) => {
      setRows(response.data)
      const c = [{ key: "id", label: "Id" },
      { key: "kmInicial", label: "Km Inicial" },
      { key: "kmFinal", label: "Km Final" },
      { key: "inicioDeslocamento", label: "Inicio Deslocamento", type: 'date' },
      { key: "fimDeslocamento", label: "Fim Deslocamento", type: 'date' },
      { key: "checkList", label: "Check List" },
      { key: "motivo", label: "Motivo" },
      { key: "observacao", label: "Observacao" },
      { key: "idCondutor", label: "Id Condutor" },
      { key: "idVeiculo", label: "Id Veiculo" },
      { key: "idCliente", label: "Id Cliente" }]

      setColumns(c)
      setLoading(false)
    })
  }, [])


  const handleNew = () => {
    setOpenNewDialog(true);
    setItemNew({} as IDeslocamentoDTO)

  };

  const handleSave = () => {
    const data: IDeslocamentoSaveBody = {
      kmInicial: itemNew.kmInicial,
      inicioDeslocamento: itemNew?.inicioDeslocamento,
      checkList: itemNew?.checkList,
      motivo: itemNew?.motivo,
      observacao: itemNew?.observacao,
      idCondutor: itemNew?.idCondutor,
      idVeiculo: itemNew?.idVeiculo,
      idCliente: itemNew?.idCliente
    }
    DeslocamentoService.iniciarDeslocamento(data).then((response) => {
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
    DeslocamentoService.delete({ id: itemDelete?.[0]?.id }).then((response) => {
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
    setItemNew({} as IDeslocamentoDTO)
    setItemDelete(undefined)
    setItemEdit({} as IDeslocamentoDTO)
  };

  const handleClickEdit = (id: any) => {
    setOpenEditDialog(true);
    setItemEdit(rows.filter((row) => row.id === id)[0])
  };

  const handleEdit = () => {
    const data: IDeslocamentoUpdateBody = {
      id: itemEdit?.id,
      fimDeslocamento: itemEdit?.fimDeslocamento,
      kmFinal: itemEdit?.kmFinal,
      observacao: itemEdit?.observacao,
    }
    DeslocamentoService.encerrarDeslocamento({ id: itemEdit?.id ?? 0 }, data).then((response) => {
      setRows(rows.map((row) => {
        if (row.id === itemEdit?.id) {
          console.log(itemEdit)
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
      setItemEdit({} as IDeslocamentoDTO)
    })
  };


  const [optionsCliente, setOptionsCliente] = useState<IClienteDTO[]>([] as IClienteDTO[]);
  const [selectedOptionCliente, setSelectedOptionCliente] = useState<IClienteDTO | null>(null);

  const handleSelectCliente = (event: React.ChangeEvent<{}>, value: IClienteDTO | null) => {
    setSelectedOptionCliente(value);
    if (value) {
      setItemNew({ ...itemNew, idCliente: value.id })
    } else {
      const { idCliente, ...updatedObject } = itemNew;
      setItemNew(updatedObject as SetStateAction<IDeslocamentoDTO>);
    }

  };

  useEffect(() => {
    ClientesService.getAll().then(({ data }) => {
      setOptionsCliente(data);
    })
  }, [])


  const [optionsVeiculo, setOptionsVeiculo] = useState<IVeiculoDTO[]>([] as IVeiculoDTO[]);
  const [selectedOptionVeiculo, setSelectedOptionVeiculo] = useState<IVeiculoDTO | null>(null);

  const handleSelectVeiculo = (event: React.ChangeEvent<{}>, value: IVeiculoDTO | null) => {
    setSelectedOptionVeiculo(value);
    if (value) {
      setItemNew({ ...itemNew, idVeiculo: value.id })
    } else {
      const { idVeiculo, ...updatedObject } = itemNew;
      setItemNew(updatedObject as SetStateAction<IDeslocamentoDTO>);
    }

  };

  useEffect(() => {
    VeiculosService.getAll().then(({ data }) => {
      setOptionsVeiculo(data);
    })
  }, [])


  const [optionsCondutor, setOptionsCondutor] = useState<ICondutorDTO[]>([] as ICondutorDTO[]);
  const [selectedOptionCondutor, setSelectedOptionCondutor] = useState<ICondutorDTO | null>(null);

  const handleSelectCondutor = (event: React.ChangeEvent<{}>, value: ICondutorDTO | null) => {
    setSelectedOptionCondutor(value);
    if (value) {
      setItemNew({ ...itemNew, idCondutor: value.id })
    } else {
      const { idCondutor, ...updatedObject } = itemNew;
      setItemNew(updatedObject as SetStateAction<IDeslocamentoDTO>);
    }

  };

  useEffect(() => {
    CondutorService.getAll().then(({ data }) => {
      setOptionsCondutor(data);
    })
  }, [])

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const parsedDate = new Date(inputValue);

    if (!isNaN(parsedDate.getTime())) {
      setSelectedDate(parsedDate);
    }
  };

  const formattedDate = format(selectedDate, 'dd/MM/yyyy');

  return (
    <>
      <Head>
        <title>SGD Naty - Deslocamento</title>
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
          : <ListItem columns={columns} rows={rows} deleteAction={handleClickDelete} editAction={handleClickEdit} hideOptions />
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
          <Stack direction="column" spacing={2} minWidth={'500px'} maxWidth={'1000px'}>
            <Autocomplete
              options={optionsCliente}
              getOptionLabel={(option) => option.nome}
              value={selectedOptionCliente}
              onChange={handleSelectCliente}
              renderInput={(params) => <TextField {...params} label="Selecione um cliente" />}
            />
            <Autocomplete
              options={optionsCondutor}
              getOptionLabel={(option) => option.nome}
              value={selectedOptionCondutor}
              onChange={handleSelectCondutor}
              renderInput={(params) => <TextField {...params} label="Selecione um condutor" />}
            />
            <Autocomplete
              options={optionsVeiculo}
              getOptionLabel={(option) => option.placa}
              value={selectedOptionVeiculo}
              onChange={handleSelectVeiculo}
              renderInput={(params) => <TextField {...params} label="Selecione um carro" />}
            />
            <TextField
              autoFocus
              margin="dense"
              id="placa"
              label="KM inicial"
              type="text"
              fullWidth
              variant="standard"
              value={itemNew?.kmInicial}
              onChange={(event) => {
                setItemNew({ ...itemNew, kmInicial: parseInt(event?.target?.value) })
              }}
            />
            <TextField
              label="Data inicio deslocamento"
              type="date"
              variant="standard"
              fullWidth
              value={itemNew?.inicioDeslocamento}
              // defaultValue={new Date()}
              onChange={(event) => {
                setItemNew({ ...itemNew, inicioDeslocamento: event?.target?.value })
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="CheckList"
              type="text"
              fullWidth
              variant="standard"
              value={itemNew?.checkList}
              onChange={(event) => {
                setItemNew({ ...itemNew, checkList: event?.target?.value })
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Motivo"
              fullWidth
              variant="standard"
              value={itemNew?.motivo}
              onChange={(event) => {
                setItemNew({ ...itemNew, motivo: (event?.target?.value) })
              }}
            />
          </Stack>
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
            {`Deseja realmente apagar o registro?`}
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
            label="KM Final"
            type="text"
            fullWidth
            variant="standard"
            value={itemEdit?.kmFinal}
            onChange={(event) => {
              setItemEdit({ ...itemEdit, kmFinal: parseInt(event?.target?.value) })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Fim deslocamento"
            type="date"
            fullWidth
            variant="standard"
            value={itemEdit?.fimDeslocamento}
            onChange={(event) => {
              setItemEdit({ ...itemEdit, fimDeslocamento: event?.target?.value })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Observação"
            type="text"
            fullWidth
            variant="standard"
            value={itemEdit?.observacao}
            onChange={(event) => {
              setItemEdit({ ...itemEdit, observacao: event?.target?.value })
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

export default DeslocamentoesTemplate
