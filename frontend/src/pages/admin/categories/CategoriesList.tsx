import { useState } from 'react'

import { PlusIcon, EditIcon, TrashIcon, Trash2Icon } from 'lucide-react'
import DataTable from '../../../components/admin/dashboard/DataTable'
import { useCreateCategory, useGetAllCategories, useSoftDeleteCategory, useUpdateCategory } from '../../../hooks/category/useCategory'
import { ICategory } from '../../../types/category'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import routes from '../../../configs/routes'

const CategoriesList = () => {
    const navigate = useNavigate()
    const { data: categories, isLoading } = useGetAllCategories()
    const { mutateAsync: createCategory } = useCreateCategory()
    const { mutateAsync: updateCategory } = useUpdateCategory()
    const { mutateAsync: softDeleteCategory } = useSoftDeleteCategory()
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ICategory>({
        defaultValues: {
            name: ''
        }
    })
    const categoryColumns = [
        {
            header: 'Danh mục',
            accessor: 'name',
        },
        {
            header: 'Sản phẩm',
            accessor: 'products',
        },
        {
            header: 'Actions',
            accessor: '_id',
            cell: (value: string, row: ICategory) => (
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
                            handleDelete(row)
                        }}
                        className="p-1 text-red-600 hover:text-red-800"
                    >
                        <TrashIcon size={16} />
                    </button>
                </div >
            ),
        },
    ]
    const handleEdit = (category: ICategory) => {
        setEditingId(category._id)
        reset({ name: category.name })
        setShowForm(true)
    }
    const handleDelete = async (category: ICategory) => {
        await softDeleteCategory(category._id)
    }
    const onSubmit: SubmitHandler<ICategory> = (data) => {
        if (editingId) {
            updateCategory(
                [editingId, { ...data }], {
                onSuccess: () => {
                    setShowForm(false)
                    reset()
                    setEditingId(null)
                }
            }
            )
        } else {
            createCategory(data, {
                onSuccess: () => {
                    setShowForm(false)
                    reset()
                }
            })
        }
    }
    if (isLoading) return 'hehe'
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your product categories
                    </p>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => navigate(routes.categoriesTrash)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <Trash2Icon className="mr-2 h-4 w-4" />
                        Trash
                    </button>
                    <button
                        onClick={() => {
                            setEditingId(null)
                            reset({ name: '' })
                            setShowForm(true)
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Add Category
                    </button>
                </div>

            </div>
            {/* Category Form */}
            {showForm && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        {editingId ? 'Cập nhật' : 'Thêm mới'}
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Tên danh mục
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register('name')}
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
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {editingId ? 'Cập nhật' : 'Lưu'}
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
                <DataTable columns={categoryColumns} data={categories || []} />
            </div>
        </div>
    )
}
export default CategoriesList
