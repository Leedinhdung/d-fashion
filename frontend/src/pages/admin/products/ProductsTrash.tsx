import TrashView from "../../../components/admin/trash/trashView"

import { useDeleteProduct, useGetProductsTrash, useRestoreProduct } from "../../../hooks/product/useProduct"
import { Image } from "../../../types/product"


const ProductsTrash = () => {
    const { data: trashedProducts, isLoading } = useGetProductsTrash()
    const { mutateAsync: restoreProduct } = useRestoreProduct()
    const { mutateAsync: deleteProduct } = useDeleteProduct()
    if (isLoading) return 'Đang tải ...'
    const columns = [
        {
            header: 'Product Name',
            accessor: 'name',
        },
        {
            header: 'Category',
            accessor: 'category',
        },
        {
            header: 'Price',
            accessor: 'price',
        },
        {
            header: 'Image',
            accessor: 'images',
            cell: (images: Image[]) => (
                images && images.length > 0 ? (
                    <img
                        src={images[0].url}
                        alt="Product"
                        className="h-10 w-10 object-cover rounded"
                        onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/40'
                        }}
                    />
                ) : (
                    <img
                        src="https://via.placeholder.com/40"
                        alt="No image"
                        className="h-10 w-10 object-cover rounded"
                    />
                )
            ),
        },
        {
            header: 'Status',
            accessor: 'status',
            cell: (value: string) => {
                let color = ''
                switch (value) {
                    case 'Active':
                        color = 'bg-green-100 text-green-800'
                        break
                    case 'Low Stock':
                        color = 'bg-amber-100 text-amber-800'
                        break
                    case 'Out of Stock':
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
        }
    ]
    return (
        <TrashView
            title="Product Trash"
            description="Restore or permanently delete trashed categories"
            data={trashedProducts || []}
            columns={columns}
            onRestore={restoreProduct}
            onPermanentDelete={deleteProduct}
        />
    )
}
export default ProductsTrash
