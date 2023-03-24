import React, { useMemo, useState } from 'react';
import { useTable, useFilters, useSortBy } from 'react-table';
import styles from "./CustomersTable2.module.css"


export default function CustomersTable2({ columns, data }) {
    const defaultColumn = useMemo(
        () => ({
            // Filtreleme işlemleri için varsayılan filtre değerlerini ayarla
            Filter: ({ column: { filterValue, preFilteredRows, setFilter } }) => {
                const count = preFilteredRows.length;
                return (
                    <input
                        value={filterValue || ''}
                        onChange={(e) => {
                            setFilter(e.target.value || undefined); // Değişiklik yapıldığında, filtrelemeyi güncelle
                        }}
                        placeholder={`Search ${count} records...`}
                    />
                );
            },
        }),
        []
    );
    const [selectedRows, setSelectedRows] = useState([]);







    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { selectedRowIds },
        setSelectedRowIds,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            rowSelection: true,
        },
        useFilters, // Filtreleme özelliğini kullanmak için
        useSortBy // Sıralama özelliğini kullanmak için
    );





    const handleEdit = (rowIndex) => {
        console.log(`Edit button clicked for row ${rowIndex}`);
    };

    const handleDelete = (rowIndex) => {
        console.log(`Delete button clicked for row ${rowIndex}`);
    };

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            const newSelectedRows = rows.map((row) => row.id);
            setSelectedRows(newSelectedRows);
        } else {
            setSelectedRows([]);
        }
    };



    return (
        <table {...getTableProps()} className={styles.table}>         
           <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                                </span>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                            <td>
                                <button onClick={() => handleEdit(i)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(i)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <button onClick={handleSelectAll}>Select All</button>
                    </td>
                    <td colSpan="4">
                        {`Selected ${rows.filter((row) => row.isSelected).length} rows`}
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}