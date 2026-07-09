import { Routes, Route } from 'react-router-dom'
import ClaimsOverview from './pages/ClaimsOverview'
import ClaimDetail from './pages/ClaimDetail'
import PortfolioAnalytics from './pages/PortfolioAnalytics'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ClaimsOverview />} />
      <Route path="/claims" element={<ClaimDetail />} />
      <Route path="/claims/:claimId" element={<ClaimDetail />} />
      <Route path="/portfolio" element={<PortfolioAnalytics />} />
    </Routes>
  )
}
