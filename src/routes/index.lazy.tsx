import { createLazyFileRoute } from '@tanstack/react-router'
import Index from '../pages/leafPages/HomeLeaf'

export const Route = createLazyFileRoute('/')({
  component: Index,
})
