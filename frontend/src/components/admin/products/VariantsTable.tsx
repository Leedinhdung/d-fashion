import React from 'react'
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
interface VariantsTableProps {
  variations: Variation[]
  variants: Variant[]
  basePrice: string
  onUpdate: (variants: Variant[]) => void
}
const VariantsTable: React.FC<VariantsTableProps> = ({
  variations,
  variants,
  basePrice,
  onUpdate,
}) => {
  const generateCombinations = (
    variations: Variation[],
  ): Record<string, string>[] => {
    if (variations.length === 0) return [{}]
    const [first, ...rest] = variations
    const restCombinations = generateCombinations(rest)
    const result: Record<string, string>[] = []
    for (const option of first.options) {
      for (const combination of restCombinations) {
        result.push({
          [first.name]: option,
          ...combination,
        })
      }
    }
    return result
  }
  const findVariant = (combination: Record<string, string>) => {
    return variants.find(
      (v) => JSON.stringify(v.combination) === JSON.stringify(combination),
    )
  }
  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-700 mb-4">
        Variant Prices and Stock
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {variations.map((variation) => (
                <th
                  key={variation.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {variation.name}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {generateCombinations(variations).map((combination, index) => {
              const variant = findVariant(combination) || {
                price: basePrice,
                stock: 0,
              }
              return (
                <tr key={index}>
                  {Object.values(combination).map((value, i) => (
                    <td
                      key={i}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {value}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={variant.price}
                      onChange={(e) => {
                        const newVariants = [...variants]
                        const existingVariantIndex = newVariants.findIndex(
                          (v) =>
                            JSON.stringify(v.combination) ===
                            JSON.stringify(combination),
                        )
                        if (existingVariantIndex >= 0) {
                          newVariants[existingVariantIndex] = {
                            ...newVariants[existingVariantIndex],
                            price: e.target.value,
                          }
                        } else {
                          newVariants.push({
                            id: Math.random().toString(36).substr(2, 9),
                            combination,
                            price: e.target.value,
                            stock: 0,
                          })
                        }
                        onUpdate(newVariants)
                      }}
                      className="w-24 border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => {
                        const newVariants = [...variants]
                        const existingVariantIndex = newVariants.findIndex(
                          (v) =>
                            JSON.stringify(v.combination) ===
                            JSON.stringify(combination),
                        )
                        if (existingVariantIndex >= 0) {
                          newVariants[existingVariantIndex] = {
                            ...newVariants[existingVariantIndex],
                            stock: parseInt(e.target.value),
                          }
                        } else {
                          newVariants.push({
                            id: Math.random().toString(36).substr(2, 9),
                            combination,
                            price: basePrice,
                            stock: parseInt(e.target.value),
                          })
                        }
                        onUpdate(newVariants)
                      }}
                      className="w-24 border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default VariantsTable
