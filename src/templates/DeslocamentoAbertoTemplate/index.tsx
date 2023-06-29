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
import { format, set } from 'date-fns';

const DeslocamentoAbertoTemplate = () => {
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

  const optionsCheclList = [
      {
        label: 'Pneus'
      },
      {
        label: 'Freios'
      },
      {
        label: 'Óleo'
      },
      {
        label: 'Luzes'
      },
      {
        label: 'Combustível'
      },
      {
        label: 'Água'
      },
      {
        label: 'Documentação'
      },
      {
        label: 'Outros'
      },
    ]

  const optionsCheclListMotivo = [
    {
      label: 'Entrega'
    },
    {
      label: 'Coleta'
    },
    {
      label: 'Manutenção'
    },
    {
      label: 'Outros'
    },
  ]

  useEffect(() => {
    DeslocamentoService.getAll().then(async(response) => {
      const c = [ 
        { key: "id", label: "ID" },
        { key: "idCliente", label: "Cliente" },
        { key: "idCondutor", label: "Condutor" },
        { key: "idVeiculo", label: "Veiculo" },
        { key: "kmInicial", label: "Km Inicial" },
        { key: "inicioDeslocamento", label: "Inicio Deslocamento", type: 'date' },
        { key: "checkList", label: "Check List", type: 'checkList' },
        { key: "motivo", label: "Motivo", type: 'checkList' },
        { key: "observacao", label: "Observacao" },
      ]
      
      setColumns(c)
      const allClientes = await ClientesService.getAll()
      const allVeiculos = await VeiculosService.getAll()
      const allCondutores = await CondutorService.getAll()
      
      console.log(response.data)

      const rows = response.data
      .filter((row) => !row.fimDeslocamento)
      .map((row) => {
        const cliente = allClientes.data.find((cliente) => cliente.id === row.idCliente)
        const veiculo = allVeiculos.data.find((veiculo) => veiculo.id === row.idVeiculo)
        const condutor = allCondutores.data.find((condutor) => condutor.id === row.idCondutor)
        return {
          ...row,
          idCliente: cliente?.nome,
          idVeiculo: veiculo?.placa,
          idCondutor: condutor?.nome,
        }
      })

      console.log(rows)

      setRows(rows)
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
      setRows([...rows, { ...data, id: response?.data , idCliente: selectedOptionCliente?.nome, idVeiculo: selectedOptionVeiculo?.placa, idCondutor: selectedOptionCondutor?.nome}])
      toast('Registro salvo com sucesso!', { type: 'success' })
    })
    .catch((error) => { 
      toast(`${error.response.data}!`, { type: 'error' }) })
    .finally(() => {
      handleClose()
    })
  };

  const handleClickDelete = (id: any) => {
    setOpenDeleteDialog(true);
    setItemDelete(rows.filter((row) => row.id === id))
  };

  const handleDelete = () => {
    DeslocamentoService.delete({ id: itemDelete?.[0]?.id }).then((response) => {
      setRows(rows.filter((row) => row.id !== itemDelete?.[0]?.id))
      toast('Registro apagado!', { type: 'error' })
    })
    .catch((error) => { toast(`${error.response.data}!`, { type: 'error' }) })
    .finally(() => {
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
    setSelectedOptionCliente(null)
    setSelectedOptionCondutor(null)
    setSelectedOptionVeiculo(null)
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
          return {
            ...row,
            ...data
          }
        }
        return row
      }))
      toast('Registro alterado com sucesso!', { type: 'success' })
    })
    .catch((error) => { toast(`${error.response.data}!`, { type: 'error' }) })
    .finally(() => {
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
          : <ListItem columns={columns} rows={rows} deleteAction={handleClickDelete} editAction={handleClickEdit} hideOptions extraOptions={false} />
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
          {"Inicio Deslocamento:"}
        </DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={2} minWidth={'500px'} maxWidth={'1000px'}>
            <Autocomplete
              size='small'
              options={optionsCliente}
              getOptionLabel={(option) => option.nome}
              value={selectedOptionCliente}
              onChange={handleSelectCliente}
              renderInput={(params) => <TextField {...params} label="Selecione um cliente" />}
            />
            <Autocomplete
              size='small'
              options={optionsCondutor}
              getOptionLabel={(option) => option.nome}
              value={selectedOptionCondutor}
              onChange={handleSelectCondutor}
              renderInput={(params) => <TextField {...params} label="Selecione um condutor" />}
            />
            <Autocomplete
              size='small'
              options={optionsVeiculo}
              getOptionLabel={(option) => option.placa}
              value={selectedOptionVeiculo}
              onChange={handleSelectVeiculo}
              renderInput={(params) => <TextField {...params} label="Selecione um carro" />}
            />
            <TextField
              label="KM inicial"
              type="text"
              fullWidth
              size='small'
              // variant="standard"
              value={itemNew?.kmInicial}
              onChange={(event) => {
                setItemNew({ ...itemNew, kmInicial: parseInt(event?.target?.value) })
              }}
            />
            <TextField
              size='small'
              label="Data inicio deslocamento"
              type="date"
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
            <Autocomplete
              size='small'
              multiple
              limitTags={1}
              id="multiple-limit-tags"
              options={optionsCheclList}
              getOptionLabel={(option) => option.label}
              // defaultValue={[categoriasHabilitacao[1]]}
              renderInput={(params) => (
                <TextField {...params} label="CheckList" placeholder="Selecione" />
              )}
              sx={{ width: '500px' }}
              onChange={(event, newValue) => {
                setItemNew({ ...itemNew, checkList: newValue.map((item) => item.label).join(', ') })

              }}
            />
            <Autocomplete
              size='small'
              multiple
              limitTags={1}
              id="multiple-limit-tags"
              options={optionsCheclListMotivo}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Motivo" placeholder="Selecione" />
              )}
              sx={{ width: '500px' }}
              onChange={(event, newValue) => {
                setItemNew({ ...itemNew, motivo: newValue.map((item) => item.label).join(', ') })

              }}
            />
            <TextField
              size='small'
              multiline
              minRows={4}
              margin="dense"
              label="Observação"
              fullWidth
              variant="standard"
              value={itemNew?.observacao}
              onChange={(event) => {
                setItemNew({ ...itemNew, observacao: (event?.target?.value) })
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
          {"Finalizar:"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            required
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
            required
            autoFocus
            margin="dense"
            label="Fim deslocamento"
            type="date"
            fullWidth
            variant="standard"
            value={itemEdit?.fimDeslocamento}
            onChange={(event) => {
              setItemEdit({ ...itemEdit, fimDeslocamento: event?.target?.value })
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            
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

export default DeslocamentoAbertoTemplate
