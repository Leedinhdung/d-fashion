import React, { useState } from 'react'

import { PlusIcon, EditIcon, TrashIcon } from 'lucide-react'
import DataTable from '../../../components/admin/dashboard/DataTable'
const CategoriesList = () => {
    // Mock categories data
    const [categories, setCategories] = useState([
        {
            id: '1',
            name: 'Electronics',
            products: 45,
            createdAt: '2023-01-15',
        },
        {
            id: '2',
            name: 'Clothing',
            products: 78,
            createdAt: '2023-01-10',
        },
        {
            id: '3',
            name: 'Home & Kitchen',
            products: 32,
            createdAt: '2023-02-05',
        },
        {
            id: '4',
            name: 'Books',
            products: 56,
            createdAt: '2023-02-15',
        },
        {
            id: '5',
            name: 'Sports & Outdoors',
            products: 24,
            createdAt: '2023-03-01',
        },
        {
            id: '6',
            name: 'Beauty & Personal Care',
            products: 41,
            createdAt: '2023-03-10',
        },
        {
            id: '7',
            name: 'Toys & Games',
            products: 29,
            createdAt: '2023-04-05',
        },
        {
            id: '8',
            name: 'Health & Household',
            products: 37,
            createdAt: '2023-04-20',
        },
    ])
    const [showForm, setShowForm] = useState(false)
    const [editingCategory, setEditingCategory] = useState<any>(null)
    const [formData, setFormData] = useState({
        name: '',
    })
    // Columns for categories table
    const categoryColumns = [
        {
            header: 'Category Name',
            accessor: 'name',
        },
        {
            header: 'Products',
            accessor: 'products',
        },
        {
            header: 'Created At',
            accessor: 'createdAt',
        },
        {
            header: 'Actions',
            accessor: 'id',
            cell: (value: string, row: any) => (
                <div className="flex space-x-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(row)
                        }}
                        className="p-1 text-blue-600 hover:text-blue-800"
                    >
                        <EditIcon size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(row.id)
                        }}
                        className="p-1 text-red-600 hover:text-red-800"
                    >
                        <TrashIcon size={16} />
                    </button>
                </div>
            ),
        },
    ]
    const handleEdit = (category: any) => {
        setEditingCategory(category)
        setFormData({
            name: category.name,
        })
        setShowForm(true)
    }
    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            setCategories(categories.filter((category) => category.id !== id))
        }
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingCategory) {
            // Update existing category
            setCategories(
                categories.map((category) =>
                    category.id === editingCategory.id
                        ? {
                            ...category,
                            name: formData.name,
                        }
                        : category,
                ),
            )
        } else {
            // Add new category
            const newCategory = {
                id: Math.random().toString(36).substr(2, 9),
                name: formData.name,
                products: 0,
                createdAt: new Date().toISOString().split('T')[0],
            }
            setCategories([...categories, newCategory])
        }
        // Reset form
        setFormData({
            name: '',
        })
        setEditingCategory(null)
        setShowForm(false)
    }
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your product categories
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingCategory(null)
                        setFormData({
                            name: '',
                        })
                        setShowForm(true)
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Category
                </button>
            </div>
            {/* Category Form */}
            {showForm && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        {editingCategory ? 'Edit Category' : 'Add New Category'}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Category Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {editingCategory ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {/* Categories Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">All Categories</h3>
                </div>
                <DataTable columns={categoryColumns} data={categories} />
            </div>
        </div>
    )
}
export default CategoriesList
