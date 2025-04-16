import React, { useState } from 'react'
import { PlusIcon } from 'lucide-react'
interface AddVariationProps {
    onAdd: (variation: { name: string; options: string[] }) => void
}
const AddVariation: React.FC<AddVariationProps> = ({ onAdd }) => {
    const [newVariation, setNewVariation] = useState({
        name: '',
        options: '',
    })
    const handleSubmit = () => {
        if (newVariation.name && newVariation.options) {
            onAdd({
                name: newVariation.name,
                options: newVariation.options.split(',').map((option) => option.trim()),
            })
            setNewVariation({
                name: '',
                options: '',
            })
        }
    }
    return (
        <div>
            <h3 className="text-sm font-medium text-gray-700">Add Variation</h3>
            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                    <label
                        htmlFor="variation-name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="variation-name"
                        value={newVariation.name}
                        onChange={(e) =>
                            setNewVariation({
                                ...newVariation,
                                name: e.target.value,
                            })
                        }
                        placeholder="e.g. Color, Size"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="variation-options"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Options (comma separated)
                    </label>
                    <input
                        type="text"
                        id="variation-options"
                        value={newVariation.options}
                        onChange={(e) =>
                            setNewVariation({
                                ...newVariation,
                                options: e.target.value,
                            })
                        }
                        placeholder="e.g. Red, Blue, Green"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div className="flex items-end">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}
export default AddVariation
