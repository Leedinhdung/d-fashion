
import {
    ShoppingCartIcon,
    UsersIcon,
    DollarSignIcon,
    TrendingUpIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import StatCard from '../../components/admin/dashboard/StatCard'
import Chart from '../../components/admin/dashboard/Chart'
import DataTable from '../../components/admin/dashboard/DataTable'
const Dashboard = () => {
    const navigate = useNavigate()
    // Mock data for statistics
    const stats = [
        {
            title: 'Total Revenue',
            value: '$24,345',
            change: {
                value: '12%',
                positive: true,
            },
            icon: DollarSignIcon,
            iconColor: 'text-green-600',
            iconBg: 'bg-green-100',
        },
        {
            title: 'Total Orders',
            value: '1,245',
            change: {
                value: '8%',
                positive: true,
            },
            icon: ShoppingCartIcon,
            iconColor: 'text-blue-600',
            iconBg: 'bg-blue-100',
        },
        {
            title: 'New Customers',
            value: '356',
            change: {
                value: '5%',
                positive: true,
            },
            icon: UsersIcon,
            iconColor: 'text-purple-600',
            iconBg: 'bg-purple-100',
        },
        {
            title: 'Conversion Rate',
            value: '3.2%',
            change: {
                value: '0.6%',
                positive: false,
            },
            icon: TrendingUpIcon,
            iconColor: 'text-amber-600',
            iconBg: 'bg-amber-100',
        },
    ]
    // Mock data for sales chart
    const salesData = [
        {
            name: 'Jan',
            value: 4000,
        },
        {
            name: 'Feb',
            value: 3000,
        },
        {
            name: 'Mar',
            value: 5000,
        },
        {
            name: 'Apr',
            value: 4500,
        },
        {
            name: 'May',
            value: 6000,
        },
        {
            name: 'Jun',
            value: 5500,
        },
        {
            name: 'Jul',
            value: 7000,
        },
    ]
    // Mock data for recent orders
    const recentOrders = [
        {
            id: '1234',
            customer: 'John Doe',
            date: '2023-06-15',
            status: 'Delivered',
            total: '$125.00',
        },
        {
            id: '1235',
            customer: 'Jane Smith',
            date: '2023-06-14',
            status: 'Processing',
            total: '$230.50',
        },
        {
            id: '1236',
            customer: 'Robert Johnson',
            date: '2023-06-14',
            status: 'Pending',
            total: '$89.99',
        },
        {
            id: '1237',
            customer: 'Emily Davis',
            date: '2023-06-13',
            status: 'Delivered',
            total: '$175.25',
        },
        {
            id: '1238',
            customer: 'Michael Brown',
            date: '2023-06-13',
            status: 'Cancelled',
            total: '$54.99',
        },
    ]
    // Columns for recent orders table
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
            header: 'Total',
            accessor: 'total',
        },
    ]
    // Mock data for top products
    const topProducts = [
        {
            id: '1',
            name: 'Wireless Headphones',
            sales: 245,
            revenue: '$12,250',
        },
        {
            id: '2',
            name: 'Smart Watch',
            sales: 187,
            revenue: '$9,350',
        },
        {
            id: '3',
            name: 'Bluetooth Speaker',
            sales: 156,
            revenue: '$7,800',
        },
        {
            id: '4',
            name: 'Fitness Tracker',
            sales: 124,
            revenue: '$6,200',
        },
        {
            id: '5',
            name: 'Laptop Sleeve',
            sales: 98,
            revenue: '$2,940',
        },
    ]
    // Columns for top products table
    const productColumns = [
        {
            header: 'Product',
            accessor: 'name',
        },
        {
            header: 'Sales',
            accessor: 'sales',
        },
        {
            header: 'Revenue',
            accessor: 'revenue',
        },
    ]
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Welcome back! Here's an overview of your store performance.
                </p>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Chart
                    data={salesData}
                    title="Sales Overview"
                    subtitle="Total sales over the last 7 months"
                />
                <div className="bg-white rounded-lg shadow p-5">
                    <h3 className="text-lg font-medium text-gray-900">
                        Sales by Category
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Distribution of sales across product categories
                    </p>
                    <div className="space-y-4 mt-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">
                                    Electronics
                                </span>
                                <span className="text-sm font-medium text-gray-700">45%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{
                                        width: '45%',
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">
                                    Clothing
                                </span>
                                <span className="text-sm font-medium text-gray-700">30%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{
                                        width: '30%',
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">
                                    Home & Kitchen
                                </span>
                                <span className="text-sm font-medium text-gray-700">15%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{
                                        width: '15%',
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Books</span>
                                <span className="text-sm font-medium text-gray-700">10%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{
                                        width: '10%',
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-5 py-4 flex justify-between items-center border-b border-gray-200">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                        <p className="text-sm text-gray-500">Latest customer orders</p>
                    </div>
                    <button
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        onClick={() => navigate('/orders')}
                    >
                        View All
                    </button>
                </div>
                <DataTable
                    columns={orderColumns}
                    data={recentOrders}
                    onRowClick={(row) => navigate(`/orders/${row.id}`)}
                />
            </div>
            {/* Top Products */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-5 py-4 flex justify-between items-center border-b border-gray-200">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">Top Products</h3>
                        <p className="text-sm text-gray-500">
                            Best selling products this month
                        </p>
                    </div>
                    <button
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        onClick={() => navigate('/products')}
                    >
                        View All
                    </button>
                </div>
                <DataTable
                    columns={productColumns}
                    data={topProducts}
                    onRowClick={(row) => navigate(`/products/${row.id}`)}
                />
            </div>
        </div>
    )
}
export default Dashboard
