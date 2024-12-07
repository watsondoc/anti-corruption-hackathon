import { Route, Routes as RouterRoutes } from "react-router"

import { MainPage } from "./main"
import { DeclarationsPage } from "./declarations"
import { DeclarationPage } from "./declaration"
import { RiskIndicatorsPage } from "./risk-indicators"

export const Routes = () => {
    return <RouterRoutes>
        <Route index element={<MainPage />} />
        <Route path="risk-indicators" element={<RiskIndicatorsPage />} />
        <Route path="declarations" element={<DeclarationsPage />} />
        <Route path="declarations/:id" element={<DeclarationPage />} />
    </RouterRoutes>
}