import { Route, Routes } from 'react-router'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import Best from './pages/Best.tsx'
import LouvainLaNeuve from './pages/LouvainLaNeuve.tsx'
import Challenge from './pages/Challenge.tsx'
import ChallengeEdition from './pages/ChallengeEdition.tsx'
import Hackathon from './pages/Hackathon.tsx'
import SummerCourse from './pages/SummerCourse.tsx'
import SummerCourseEdition from './pages/SummerCourseEdition.tsx'
import Board from './pages/Board.tsx'
import PreviousBoards from './pages/PreviousBoards.tsx'
import Partners from './pages/Partners.tsx'
import NotFound from './pages/NotFound.tsx'

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
        <Route path="summer-course/:year" element={<SummerCourseEdition />} />
        <Route path="board" element={<Board />} />
        <Route path="board/previous" element={<PreviousBoards />} />
        <Route path="board/:years" element={<Board />} />
        <Route path="partners" element={<Partners />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
