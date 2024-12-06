import { Route, Routes as RouterRoutes } from "react-router"

import { MainPage } from "./main"
import { DeclarationsPage } from "./declarations"
import { DeclarationPage } from "./declaration"

export const Routes = () => {
    return <RouterRoutes>
        <Route index element={<MainPage />} />
        <Route path="declarations" element={<DeclarationsPage />} />
        <Route path="declarations/:id" element={<DeclarationPage />} />
    </RouterRoutes>
}