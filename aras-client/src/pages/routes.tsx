import { Route, Routes as RouterRoutes } from "react-router"

import { MainPage } from "./main"
import { DeclarationsPage } from "./declarations"
import { DeclarantPage } from "./declarant/declarant"
import { RiskIndicatorsPage } from "./risk-indicators"
import { NotFoundPage } from "./not-found-page"

export const Routes = () => {
    return <RouterRoutes>
        <Route index element={<MainPage />} />
        <Route path="risk-indicators" element={<RiskIndicatorsPage />} />
        <Route path="declarations" element={<DeclarationsPage />} />
        <Route path="declarant/:id" element={<DeclarantPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
}