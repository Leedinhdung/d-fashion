import TrashView, { TableColumn } from "../../../components/admin/trash/trashView"
import { useDeleteCategory, useGetCategoriesTrash, useRestoreCategory } from "../../../hooks/category/useCategory"
import { ICategory } from "../../../types/category"


const CategoriesTrash = () => {
    const { data: trashedCategories, isLoading } = useGetCategoriesTrash()
    const { mutateAsync: restoreCategory } = useRestoreCategory()
    const { mutateAsync: deleteCategory } = useDeleteCategory()
    if (isLoading) return 'Đang tải ...'
    const columns: TableColumn<ICategory>[] = [
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
