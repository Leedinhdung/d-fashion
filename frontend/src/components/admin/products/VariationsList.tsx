import React from 'react'
import { TrashIcon } from 'lucide-react'
interface Variation {
  id: string
  name: string
  options: string[]
}
interface VariationsListProps {
  variations: Variation[]
  onRemove: (id: string) => void
}
const VariationsList: React.FC<VariationsListProps> = ({
  variations,
  onRemove,
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700">Current Variations</h3>
      <div className="mt-2 space-y-4">
        {variations.map((variation) => (
          <div key={variation.id} className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-gray-900">
                {variation.name}
              </h4>
              <button
                type="button"
                onClick={() => onRemove(variation.id)}
                className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
              >
                <TrashIcon size={16} />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {variation.options.map((option, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        ))}
        {variations.length === 0 && (
          <p className="text-sm text-gray-500">No variations added yet.</p>
        )}
      </div>
    </div>
  )
}
export default VariationsList
