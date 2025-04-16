"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { SaveIcon, ArrowLeftIcon } from "lucide-react"
import axios from "axios"
import VariationsManager from "../../../components/admin/products/VariationsManager"
import ImagesTab from "../../../components/admin/products/ImagesTab"
import type { IProduct, Variant, Variation } from "../../../types/product"
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from "../../../configs/cloundinary"
import { useCreateProduct, useGetProductById, useUpdateProduct } from "../../../hooks/product/useProduct"
import { useGetAllCategories } from "../../../hooks/category/useCategory"
import routes from "../../../configs/routes"
import type { ICategory } from "../../../types/category"


const STATUSES = ["Active", "Out of Stock"]

const ProductForm: React.FC = () => {
    const { id } = useParams<{ id?: string }>()
    const isEdit = !!id
    const { mutateAsync: createProduct } = useCreateProduct()
    const { mutateAsync: updateProduct } = useUpdateProduct()
    const { data: productById, isLoading } = useGetProductById(id || "")
    const { data: categories } = useGetAllCategories()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = React.useState<"general" | "images" | "variations">("general")
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm<IProduct>({
        defaultValues: {
            name: "",
            description: "",
            categoryId: "",
            price: "",
            status: "Active",
            images: [],
            variations: [],
            variants: [],
        },
    })

    React.useEffect(() => {
        if (isEdit && productById && categories) {
            const categoryId = categories.find((cat: ICategory) => cat.name === productById.categoryId)?._id || ""
            reset({
                name: productById.name || "",
                description: productById.description || "",
                categoryId,
                price: productById.price || "",
                status: productById.status || "Active",
                images: productById.images || [],
                variations: productById.variations || [],
                variants: productById.variants || [],
            })
        }
    }, [productById, categories, isEdit, reset])

    const images = watch("images")
    const variations = watch("variations")
    const variants = watch("variants")

    const handleImageUpload = React.useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0]
                if (file.size > 10 * 1024 * 1024) {
                    alert("File is too large. Maximum size is 10MB.")
                    return
                }
                if (!file.type.startsWith("image/")) {
                    alert("Please upload an image file (PNG, JPG, GIF).")
                    return
                }

                const formData = new FormData()
                formData.append("file", file)
                formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)

                try {
                    const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    const imageUrl = response.data.secure_url
                    setValue("images", [...images, { url: imageUrl, fileName: file.name }])
                } catch (error) {
                    console.error("Cloudinary upload failed:", error)
                    alert("Failed to upload image to Cloudinary.")
                }
            }
        },
        [images, setValue],
    )

    const removeImage = React.useCallback(
        (index: number) => {
            setValue(
                "images",
                images.filter((_, i) => i !== index),
            )
        },
        [images, setValue],
    )

    const handleAddVariation = React.useCallback(
        (variation: Omit<Variation, "id">) => {
            const newVariation = {
                id: Math.random().toString(36).substring(2, 9),
                ...variation,
            }
            setValue("variations", [...variations, newVariation])
        },
        [variations, setValue],
    )

    const handleRemoveVariation = React.useCallback(
        (id: string) => {
            const variationToRemove = variations.find((v) => v.id === id)
            setValue(
                "variations",
                variations.filter((v) => v.id !== id),
            )
            if (variationToRemove) {
                setValue(
                    "variants",
                    variants.filter((v) => !Object.keys(v.combination).includes(variationToRemove.name)),
                )
            }
        },
        [variations, variants, setValue],
    )

    const handleUpdateVariants = React.useCallback(
        (newVariants: Variant[]) => {
            setValue("variants", newVariants)
        },
        [setValue],
    )

    const onSubmit = async (data: IProduct) => {
        try {
            if (isEdit) {
                const productData = {
                    ...data,
                    categoryId: data.categoryId,
                    images: data.images.map((img) => ({
                        url: img.url,
                        fileName: img.fileName,
                    })),
                }

                await updateProduct([id!, productData])
            } else {
                const submitData = {
                    data: {
                        ...data,
                        categoryId: data.categoryId,
                        images: data.images.map((img) => ({
                            url: img.url,
                            fileName: img.fileName,
                        })),
                    },
                }

                await createProduct(submitData)
            }
            navigate(routes.products)
        } catch (error) {
            console.error(`${isEdit ? "Update" : "Create"} product failed:`, error)
            if (error instanceof Error) {
                alert(`Lỗi: ${error.message}`)
            } else {
                alert(`${isEdit ? "Cập nhật" : "Tạo"} sản phẩm thất bại. Vui lòng thử lại.`)
            }
        }
    }

    if (isEdit && isLoading) return <div className="text-center py-4">Loading...</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate(routes.products)}
                        className="mr-4 p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label="Go back"
                    >
                        <ArrowLeftIcon size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">{isEdit ? "Edit Product" : "Add New Product"}</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            {isEdit ? "Update product details" : "Create a new product in your inventory"}
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <SaveIcon className="mr-2 h-4 w-4" />
                    {isEdit ? "Update Product" : "Create Product"}
                </button>
            </div>

            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {(["general", "images", "variations"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            {tab === "general" && "General Information"}
                            {tab === "images" && "Images"}
                            {tab === "variations" && "Variations"}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                {activeTab === "general" && (
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Product Name
                            </label>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: "Product name is required" }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="name"
                                        className={`mt-1 block w-full border ${errors.name ? "border-red-500" : "border-gray-300"
                                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                    />
                                )}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <Controller
                                name="categoryId"
                                control={control}
                                rules={{ required: "Category is required" }}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        id="categoryId"
                                        className={`mt-1 block w-full border ${errors.categoryId ? "border-red-500" : "border-gray-300"
                                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                    >
                                        <option value="">Select Category</option>
                                        {categories?.map((category: ICategory) => (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            {errors.categoryId && <p className="mt-1 text-sm text-red-500">{errors.categoryId.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price ($)
                            </label>
                            <Controller
                                name="price"
                                control={control}
                                rules={{
                                    required: "Price is required",
                                    pattern: {
                                        value: /^\d+(\.\d{1,2})?$/,
                                        message: "Please enter a valid price",
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="price"
                                        className={`mt-1 block w-full border ${errors.price ? "border-red-500" : "border-gray-300"
                                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                    />
                                )}
                            />
                            {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <Controller
                                name="status"
                                control={control}
                                rules={{ required: "Status is required" }}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        id="status"
                                        className={`mt-1 block w-full border ${errors.status ? "border-red-500" : "border-gray-300"
                                            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                    >
                                        {STATUSES.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            {errors.status && <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        id="description"
                                        rows={4}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                )}
                            />
                        </div>
                    </form>
                )}

                {activeTab === "images" && (
                    <ImagesTab images={images.map((img) => img.url)} onUpload={handleImageUpload} onRemove={removeImage} />
                )}

                {activeTab === "variations" && (
                    <VariationsManager
                        variations={variations}
                        variants={variants}
                        basePrice={watch("price")}
                        onAddVariation={handleAddVariation}
                        onRemoveVariation={handleRemoveVariation}
                        onUpdateVariants={handleUpdateVariants}
                    />
                )}
            </div>
        </div>
    )
}

export default ProductForm
