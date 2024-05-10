// import { useTable } from "react-table";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableContainer,
//   Input,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";

// export default function CustomTable({ columns, renderRow, onRowClick, data, ...rest }) {
//   const {
//     getTableProps, // table props from react-table
//     getTableBodyProps, // table body props from react-table
//     headerGroups, // headerGroups, if your table has groupings
//     rows, // rows for the table based on the data passed
//     prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
//   } = useTable({
//     columns,
//     data,
//     getCoreRowModel: getCoreRowModel(),
//     meta: {
//       updateData: (rowIndex, columnId, value) => {
//         setData((old) =>
//           old.map((row, index) => {
//             if (index === rowIndex) {
//               return {
//                 ...old[rowIndex],
//                 [columnId]: value,
//               };
//             }
//             return row;
//           })
//         );
//       },
//     },
//   });


//   return (
//     <TableContainer mx='auto' align='center' maxW={{ base: '90%', lg: '1184px' }} {...rest}>
//       <Table {...getTableProps()}>
//         <Thead>
//           {headerGroups.map(headerGroup => (
//             <Tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <Th textAlign={'center'} {...column.getHeaderProps()}>{column.render("Header")}</Th>
//               ))}
//             </Tr>
//           ))}
//         </Thead>
//         <Tbody {...getTableBodyProps()}>
//           {rows.map((row, i) => {
//             prepareRow(row); // This line is necessary to prepare the rows and get the row props from react-Table dynamically

//             // Each row can be rendered directly as a string using the react-Table render method
//             return (
//               <Tr onClick={() => onRowClick && onRowClick(row.original.id)} {...row.getRowProps()}>
//                 {row.cells.map(cell => {
//                   const cellData = cell.render("Cell")
import { useState, useEffect } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, } from "@tanstack/react-table";
import { Box, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

const CustomTable = ({ columns, cellType, onRowClick, data, ...rest }) => {
  const columnHelper = createColumnHelper();
  const [dataToUse, setData] = useState([...data])

  useEffect(() => {
    setData([...data])
  }, [])

  const TableCell = ({ getValue, row, column, table }) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    const onBlur = () => {
      table.options.meta?.updateData(row.index, column.id, value);
    };

    return (
      cellType === 'input' ? (
        <Input
          borderColor={'#aaa'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      ) : (
        <Box>
          <Text>{value}</Text>
        </Box>
      )
    );
  };

  const columnsToUse = columns?.map(col => (
    columnHelper.accessor(col?.accessor, {
      header: col?.Header,
      cell: TableCell,
    })
  ))

  const table = useReactTable({
    data: dataToUse,
    columns: columnsToUse,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });


  return (
    <TableContainer  {...rest}>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr
              key={row.id}
              onClick={() => onRowClick && onRowClick(row?.original?.id)}
            >
              {row.getVisibleCells().map((cell) => (
                <Td
                  key={cell.id}
                  cursor={onRowClick && 'pointer'}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable