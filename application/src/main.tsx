import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import "./main.css"

import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { IsNavProvider } from './shared/context/NavContext.tsx'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <IsNavProvider>
                <RouterProvider router={router} />
            </IsNavProvider>
        </StrictMode>,
    )
}
