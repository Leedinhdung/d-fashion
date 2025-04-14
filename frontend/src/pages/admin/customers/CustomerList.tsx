import React, { useState } from 'react'

import { SearchIcon } from 'lucide-react'
import DataTable from '../../../components/admin/dashboard/DataTable'
const CustomersList = () => {
    // Mock customers data
    const [customers, setCustomers] = useState([
        {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            orders: 5,
            totalSpent: '$625.75',
            joinedDate: '2023-01-15',
            status: 'Active',
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            orders: 8,
            totalSpent: '$982.50',
            joinedDate: '2023-02-03',
            status: 'Active',
        },
        {
            id: '3',
            name: 'Robert Johnson',
            email: 'robert.johnson@example.com',
            orders: 2,
            totalSpent: '$178.99',
            joinedDate: '2023-03-17',
            status: 'Active',
        },
        {
            id: '4',
            name: 'Emily Davis',
            email: 'emily.davis@example.com',
            orders: 6,
            totalSpent: '$539.75',
            joinedDate: '2023-01-28',
            status: 'Active',
        },
        {
            id: '5',
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            orders: 1,
            totalSpent: '$54.99',
            joinedDate: '2023-04-05',
            status: 'Inactive',
        },
        {
            id: '6',
            name: 'Sarah Wilson',
            email: 'sarah.wilson@example.com',
            orders: 4,
            totalSpent: '$387.25',
            joinedDate: '2023-02-12',
            status: 'Active',
        },
        {
            id: '7',
            name: 'David Taylor',
            email: 'david.taylor@example.com',
            orders: 3,
            totalSpent: '$215.50',
            joinedDate: '2023-03-01',
            status: 'Active',
        },
        {
            id: '8',
            name: 'Lisa Anderson',
            email: 'lisa.anderson@example.com',
            orders: 7,
            totalSpent: '$692.75',
            joinedDate: '2023-01-10',
            status: 'Active',
        },
    ])
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    // Get unique statuses for filter dropdown
    const statuses = [...new Set(customers.map((customer) => customer.status))]
    // Filtered customers
    const filteredCustomers = customers.filter((customer) => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter ? customer.status === statusFilter : true
        return matchesSearch && matchesStatus
    })
    // Columns for customers table
    const customerColumns = [
        {
            header: 'Customer',
            accessor: 'name',
        },
        {
            header: 'Email',
            accessor: 'email',
        },
        {
            header: 'Orders',
            accessor: 'orders',
        },
        {
            header: 'Total Spent',
            accessor: 'totalSpent',
        },
        {
            header: 'Joined Date',
            accessor: 'joinedDate',
        },
        {
            header: 'Status',
            accessor: 'status',
            cell: (value: string) => {
                const color =
                    value === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                return (
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
                    >
                        {value}
                    </span>
                )
            },
        },
    ]
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
                <p className="mt-1 text-sm text-gray-500">Manage your customer base</p>
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
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
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
                </div>
            </div>
            {/* Customers Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">All Customers</h3>
                </div>
                <DataTable columns={customerColumns} data={filteredCustomers} />
            </div>
        </div>
    )
}
export default CustomersList
