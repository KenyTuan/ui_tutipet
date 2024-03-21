import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
  }
  interface BoardProps  {
    columns: Column[];
    children: React.ReactNode
  }
export const Board: React.FC<BoardProps> = ({ columns, children }) =>  {
  return (
    <>
        <TableContainer sx={{ maxHeight: 1550 }} className='border-y-2' >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className='border-r-2 font-semibold text-gray-400 '
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody >
              {children}
            </TableBody>
          </Table>
      </TableContainer>
    </>
  )
}
