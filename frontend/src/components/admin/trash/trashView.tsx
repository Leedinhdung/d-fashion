import { RefreshCwIcon, Trash2Icon } from 'lucide-react'
import DataTable from '../dashboard/DataTable'


export interface TableColumn<T> {
    header: string;
    accessor: string;
    cell?: (value: string, row: T) => React.ReactNode;
}
interface TrashViewProps<T> {
    title: string
    description: string
    data: T[]
    columns: TableColumn<T>[]
    onRestore: (id: string) => void
    onPermanentDelete: (id: string) => void
}
const TrashView = <T extends { _id: string }>({
    title,
    description,
    data,
    columns,
    onRestore,
    onPermanentDelete,
}: TrashViewProps<T>) => {
    const trashColumns = [
        ...columns,
        {
            header: 'Actions',
            accessor: '_id',
            cell: (value: string) => (
                <div className="flex space-x-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            if (
                                window.confirm('Are you sure you want to restore this item?')
                            ) {
                                onRestore(value)
                            }
                        }}
                        className="p-1 text-green-600 hover:text-green-800"
                        title="Restore"
                    >
                        <RefreshCwIcon size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            if (
                                window.confirm(
                                    'Are you sure you want to permanently delete this item? This action cannot be undone.',
                                )
                            ) {
                                onPermanentDelete(value)
                            }
                        }}
                        className="p-1 text-red-600 hover:text-red-800"
                        title="Delete Permanently"
                    >
                        <Trash2Icon size={16} />
                    </button>
                </div>
            ),
        },
    ]
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Deleted Items</h3>
                </div>
                {data.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No items in trash</div>
                ) : (
                    <DataTable columns={trashColumns} data={data} />
                )}
            </div>
        </div>
    )
}
export default TrashView
