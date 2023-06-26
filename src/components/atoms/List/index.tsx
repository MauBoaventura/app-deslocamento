import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import theme from '../../../theme';

export default function ListItem({ rows, columns , deleteAction}: { rows: any[], columns: any[] , deleteAction: any}) {
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
        console.log('Botão de Editar clicado '+id);
    };

    const handleDeleteClick = (id: string) => {
        console.log('Botão de Apagar clicado '+id);
        deleteAction(id)
    };
    return (
        <Paper sx={{ width: '100%' }}>{columns ? <>

            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns?.map((column) => (
                                <TableCell
                                    key={column.key}
                                    align={`right`}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell key={0} align={`right`}>
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns?.map((column) => {
                                            const value = row[column.key];
                                            return (
                                                <TableCell key={column.key} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell key={0} align={`center`}>
                                            <IconButton aria-label="delete">
                                                <Delete color='error' onClick={()=>handleDeleteClick(row?.id)} />
                                            </IconButton>
                                            <IconButton aria-label="edit">
                                                <Edit color='info' onClick={()=>handleEditClick(row?.id)} />
                                            </IconButton>

                                        </TableCell>
                                    </TableRow>
                                );
                            })}
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
