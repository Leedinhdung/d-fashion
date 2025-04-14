import React from 'react'
import { ICategory } from '../../../types/category'
interface Column {
    header: string
    accessor: string
    cell?: (value: any, row: any) => React.ReactNode
}
interface DataTableProps {
    columns: Column[]
    data: ICategory[]
    onRowClick?: (row: any) => void
}
const DataTable = ({ columns, data, onRowClick }: DataTableProps) => {
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
                                        : row[column.accessor]}
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
