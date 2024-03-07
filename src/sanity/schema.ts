import { type SchemaTypeDefinition } from 'sanity'
import product from './schemas/product'
import category from './schemas/category'
import heroImages from './schemas/heroImages'
import blockContent from './schemas/blockContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, heroImages, blockContent],
}

