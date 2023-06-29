import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, IconButton, Chip, Stack } from '@mui/material';
import { Edit, Delete , Directions} from '@mui/icons-material';

export default function ListItem({ rows, columns, deleteAction, editAction, hideOptions, extraOptions = true }: { rows: any[], columns: any[], deleteAction: any, editAction: any, hideOptions?: boolean , extraOptions?: boolean}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEditClick = (id: string) => {
        editAction(id)
    };

    const handleDeleteClick = (id: string) => {
        deleteAction(id)
    };
    return (
        <Paper sx={{ width: '100%' }}>{
        columns ? <>
            <TableContainer sx={{ maxHeight: 400 }}>
                <Table aria-label="dense table stickyHeader"
                    size={'small'}>
                    <TableHead >
                        <TableRow>
                            {columns?.map((column) => (
                                <TableCell
                                    key={column.key}
                                    align={`left`}
                                    // style={{ minWidth: column.minWidth }}
                                    role="checkbox" tabIndex={-1}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            {(!hideOptions || !extraOptions) &&
                                <TableCell key={0} align={`center`}>
                                    Ações
                                </TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {rows.length > 0 ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns?.map((column) => {
                                            const value = row[column.key];
                                            return (
                                                <TableCell key={column.key} align={column.align} padding='checkbox'>
                                                    {
                                                        column.type == 'date' && value != null ? new Date(value).toLocaleString('pt-BR', { timeZone: 'UTC' }).split(', ')[0] :
                                                            column.type == 'currency' ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value) :
                                                                column.type == 'boolean' ? value ? 'Sim' : 'Não' :
                                                                    column.type == 'checkList' ? value?.split(',')?.map((item: any) => 
                                                                    <Stack direction="column" margin={'4px'}>
                                                                        <Chip label={item} color="primary" />
                                                                    </Stack >
                                                                    ) :
                                                                    value}
                                                </TableCell>
                                            );
                                        })}
                                        {!hideOptions &&
                                            <TableCell align={`center`} padding='checkbox'>
                                                <IconButton aria-label="edit" onClick={() => handleEditClick(row?.id)}>
                                                    <Edit color='info' />
                                                </IconButton>
                                                <IconButton aria-label="delete" size='small' onClick={() => handleDeleteClick(row?.id)}>
                                                    <Delete color='error' />
                                                </IconButton>
                                            </TableCell>
                                        }
                                        {!extraOptions &&
                                            <TableCell align={`center`} padding='checkbox'>
                                                <IconButton aria-label="edit" onClick={() => handleEditClick(row?.id)}>
                                                    <Directions color='info' />
                                                </IconButton>
                                                <IconButton aria-label="delete" size='small' onClick={() => handleDeleteClick(row?.id)}>
                                                    <Delete color='error' />
                                                </IconButton>
                                            </TableCell>
                                        } 
                                    </TableRow>
                                );
                            }):<>
                                <TableRow hover role="checkbox" tabIndex={-1} key={0} >
                                    <TableCell align={`center`} colSpan={columns.length + 1} height={'300px'}>
                                        <h1>Nenhum registro encontrado</h1>
                                    </TableCell>
                                </TableRow>
                            </>}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </> : <><h1>Lista vazia</h1>
        </>}
        </Paper>
    );
}
