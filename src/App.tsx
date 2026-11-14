import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'

// Every page except the home page is downloaded only when visited.
const Best = lazy(() => import('./pages/Best.tsx'))
const LouvainLaNeuve = lazy(() => import('./pages/LouvainLaNeuve.tsx'))
const Challenge = lazy(() => import('./pages/Challenge.tsx'))
const ChallengeEdition = lazy(() => import('./pages/ChallengeEdition.tsx'))
const Hackathon = lazy(() => import('./pages/Hackathon.tsx'))
const SummerCourse = lazy(() => import('./pages/SummerCourse.tsx'))
const Board = lazy(() => import('./pages/Board.tsx'))
const Partners = lazy(() => import('./pages/Partners.tsx'))
const NotFound = lazy(() => import('./pages/NotFound.tsx'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="best" element={<Best />} />
        <Route path="louvain-la-neuve" element={<LouvainLaNeuve />} />
        <Route path="challenge" element={<Challenge />} />
        <Route path="challenge/:slug" element={<ChallengeEdition />} />
        <Route path="hackathon" element={<Hackathon />} />
        <Route path="summer-course" element={<SummerCourse />} />
        <Route path="summer-course/:year" element={<Navigate to="/summer-course" replace />} />
        <Route path="board" element={<Board />} />
        <Route path="board/previous" element={<Navigate to="/board#previous-boards" replace />} />
        <Route path="board/:years" element={<Board />} />
        <Route path="partners" element={<Partners />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
