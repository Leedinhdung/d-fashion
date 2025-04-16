import React from 'react'

interface Column<T> {
    header: string
    accessor: keyof T
    cell?: (value: any, row: T) => React.ReactNode
}

interface DataTableProps<T> {
    columns: Column<T>[]
    data: T[]
    onRowClick?: (row: T) => void
}

const DataTable = <T,>({ columns, data, onRowClick }: DataTableProps<T>) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                            onClick={() => onRowClick && onRowClick(row)}
                        >
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {column.cell
                                        ? column.cell(row[column.accessor], row)
                                        : typeof row[column.accessor] === 'object'
                                        ? JSON.stringify(row[column.accessor]) 
                                        : row[column.accessor] as React.ReactNode}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable
