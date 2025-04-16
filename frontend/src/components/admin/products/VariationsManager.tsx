import React from 'react'
import AddVariation from './AddVariation'
import VariationsList from './VariationsList'
import VariantsTable from './VariantsTable'
interface Variant {
  id: string
  combination: Record<string, string>
  price: string
  stock: number
}
interface Variation {
  id: string
  name: string
  options: string[]
}
interface VariationsManagerProps {
  variations: Variation[]
  variants: Variant[]
  basePrice: string
  onAddVariation: (variation: Omit<Variation, 'id'>) => void
  onRemoveVariation: (id: string) => void
  onUpdateVariants: (variants: Variant[]) => void
}
const VariationsManager: React.FC<VariationsManagerProps> = ({
  variations,
  variants,
  basePrice,
  onAddVariation,
  onRemoveVariation,
  onUpdateVariants,
}) => {
  return (
    <div className="space-y-6">
      <AddVariation onAdd={onAddVariation} />
      <VariationsList variations={variations} onRemove={onRemoveVariation} />
      {variations.length > 0 && (
        <VariantsTable
          variations={variations}
          variants={variants}
          basePrice={basePrice}
          onUpdate={onUpdateVariants}
        />
      )}
    </div>
  )
}
export default VariationsManager
