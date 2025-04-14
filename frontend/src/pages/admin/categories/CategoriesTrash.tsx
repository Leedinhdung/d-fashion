import TrashView from "../../../components/admin/trash/trashView"
import { useDeleteCategory, useGetCategoriesTrash, useRestoreCategory } from "../../../hooks/category/useCategory"


const CategoriesTrash = () => {
    const { data: trashedCategories, isLoading } = useGetCategoriesTrash()
    const { mutateAsync: restoreCategory } = useRestoreCategory()
    const { mutateAsync: deleteCategory } = useDeleteCategory()
    if (isLoading) return 'Đang tải ...'
    const columns = [
        {
            header: 'Category Name',
            accessor: 'name',
        },
        {
            header: 'Products',
            accessor: 'products',
        },
        {
            header: 'Deleted At',
            accessor: 'deletedAt',
            cell: (value: string) => new Date(value).toLocaleDateString(),
        },
    ]
    return (
        <TrashView
            title="Categories Trash"
            description="Restore or permanently delete trashed categories"
            data={trashedCategories || []}
            columns={columns}
            onRestore={restoreCategory}
            onPermanentDelete={deleteCategory}
        />
    )
}
export default CategoriesTrash
