import { useState } from 'react'
import { SearchIcon, DownloadIcon } from 'lucide-react'
import DataTable from '../../../components/admin/dashboard/DataTable'
const OrdersList = () => {
    // Mock orders data
    const [orders] = useState([
        {
            id: '1234',
            customer: 'John Doe',
            date: '2023-06-15',
            status: 'Delivered',
            total: '$125.00',
            paymentStatus: 'Paid',
        },
        {
            id: '1235',
            customer: 'Jane Smith',
            date: '2023-06-14',
            status: 'Processing',
            total: '$230.50',
            paymentStatus: 'Paid',
        },
        {
            id: '1236',
            customer: 'Robert Johnson',
            date: '2023-06-14',
            status: 'Pending',
            total: '$89.99',
            paymentStatus: 'Pending',
        },
        {
            id: '1237',
            customer: 'Emily Davis',
            date: '2023-06-13',
            status: 'Delivered',
            total: '$175.25',
            paymentStatus: 'Paid',
        },
        {
            id: '1238',
            customer: 'Michael Brown',
            date: '2023-06-13',
            status: 'Cancelled',
            total: '$54.99',
            paymentStatus: 'Refunded',
        },
        {
            id: '1239',
            customer: 'Sarah Wilson',
            date: '2023-06-12',
            status: 'Delivered',
            total: '$112.75',
            paymentStatus: 'Paid',
        },
        {
            id: '1240',
            customer: 'David Taylor',
            date: '2023-06-12',
            status: 'Processing',
            total: '$67.50',
            paymentStatus: 'Paid',
        },
        {
            id: '1241',
            customer: 'Lisa Anderson',
            date: '2023-06-11',
            status: 'Delivered',
            total: '$94.25',
            paymentStatus: 'Paid',
        },
    ])
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [dateFilter, setDateFilter] = useState('')
    // Get unique statuses for filter dropdown
    const statuses = [...new Set(orders.map((order) => order.status))]
    const dates = [...new Set(orders.map((order) => order.date))]
    // Filtered orders
    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.includes(searchTerm)
        const matchesStatus = statusFilter ? order.status === statusFilter : true
        const matchesDate = dateFilter ? order.date === dateFilter : true
        return matchesSearch && matchesStatus && matchesDate
    })
    // Columns for orders table
    const orderColumns = [
        {
            header: 'Order ID',
            accessor: 'id',
        },
        {
            header: 'Customer',
            accessor: 'customer',
        },
        {
            header: 'Date',
            accessor: 'date',
        },
        {
            header: 'Status',
            accessor: 'status',
            cell: (value: string) => {
                let color = ''
                switch (value) {
                    case 'Delivered':
                        color = 'bg-green-100 text-green-800'
                        break
                    case 'Processing':
                        color = 'bg-blue-100 text-blue-800'
                        break
                    case 'Pending':
                        color = 'bg-amber-100 text-amber-800'
                        break
                    case 'Cancelled':
                        color = 'bg-red-100 text-red-800'
                        break
                    default:
                        color = 'bg-gray-100 text-gray-800'
                }
                return (
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
                    >
                        {value}
                    </span>
                )
            },
        },
        {
            header: 'Payment',
            accessor: 'paymentStatus',
            cell: (value: string) => {
                let color = ''
                switch (value) {
                    case 'Paid':
                        color = 'bg-green-100 text-green-800'
                        break
                    case 'Pending':
                        color = 'bg-amber-100 text-amber-800'
                        break
                    case 'Refunded':
                        color = 'bg-purple-100 text-purple-800'
                        break
                    default:
                        color = 'bg-gray-100 text-gray-800'
                }
                return (
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
                    >
                        {value}
                    </span>
                )
            },
        },
        {
            header: 'Total',
            accessor: 'total',
        },
    ]
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage and track customer orders
                    </p>
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Export
                </button>
            </div>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-5">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by order ID or customer..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                        <div>
                            <label htmlFor="status" className="sr-only">
                                Status
                            </label>
                            <select
                                id="status"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">All Statuses</option>
                                {statuses.map((status, index) => (
                                    <option key={index} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date" className="sr-only">
                                Date
                            </label>
                            <select
                                id="date"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">All Dates</option>
                                {dates.map((date, index) => (
                                    <option key={index} value={date}>
                                        {date}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">All Orders</h3>
                </div>
                <DataTable columns={orderColumns} data={filteredOrders} />
            </div>
        </div>
    )
}
export default OrdersList
