import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { toast } from 'react-toastify';

import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import {
  user__get_all,
  user__delete_one,
} from '../../features/users/user__Slice';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const ListUser = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { items, total, isLoading, isError, isSucces, message } =
    useAppSelector((state: RootState) => state.user__state);

  useEffect(() => {
    dispatch(user__get_all({ page: `${page + 1}`, limit: `${rowsPerPage}` }));
    if (isError) {
      toast.error(message);
    }
  }, [page, rowsPerPage, isError, isSucces, message, dispatch]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total!) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    dispatch(user__get_all({ page: `${page + 1}`, limit: `${rowsPerPage}` }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

    dispatch(user__get_all({ page: `${page + 1}`, limit: `${rowsPerPage}` }));
  };

  const deleteHanler = (_id: string) => {
    dispatch(user__delete_one({ _id }));
    dispatch(user__get_all({ page: `${page + 1}`, limit: `${rowsPerPage}` }));
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper}>
      <Table
        stickyHeader
        sx={{ minWidth: 500 }}
        aria-label='custom pagination table'
      >
        <TableHead>
          <TableRow sx={{ position: 'sticky', top: 0 }}>
            <TableCell style={{ width: 100 }} align='center'>
              Name
            </TableCell>
            <TableCell style={{ width: 100 }} align='center'>
              email
            </TableCell>
            <TableCell style={{ width: 100 }} align='center'>
              role
            </TableCell>
            <TableCell style={{ width: 50 }} align='center'>
              edit
            </TableCell>
            <TableCell style={{ width: 50 }} align='center'>
              delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items &&
            items.map((row) => (
              <TableRow key={row._id}>
                <TableCell style={{ width: 100 }} align='center'>
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 100 }} align='center'>
                  {row.email}
                </TableCell>
                <TableCell style={{ width: 100 }} align='center'>
                  {row.role}
                </TableCell>

                <TableCell style={{ width: 50 }} align='center'>
                  <IconButton component={Link} href={`/user-admin/${row._id}`}>
                    <EditIcon color='primary' />
                  </IconButton>
                </TableCell>
                <TableCell style={{ width: 50 }} align='center'>
                  <IconButton onClick={() => deleteHanler(row._id)}>
                    <DeleteForeverIcon color='error' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100, 500, 1000]}
              colSpan={3}
              count={total!}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ListUser;
