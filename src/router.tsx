import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './layouts/Layout'
const IndexPage = lazy(() => import('./pages/IndexPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))
const AppPage = lazy(() => import('./pages/AppPage'));
const HowUse = lazy(() => import('./pages/HowUse'));
const GenerateAI = lazy(() => import('./pages/GenerateAI'));

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
           <Route element={<Layout />}>
              <Route path='/' element={
                  <Suspense fallback="Cargando...">
                      <IndexPage />
                  </Suspense>
              } index />
              <Route path='/favoritos' element={
                <Suspense fallback="Cargando...">
                    <FavoritesPage />
                </Suspense>
              } />
              <Route path='/app' element={
                <Suspense fallback="Cargando...">
                    <AppPage />
                </Suspense>
              } />
              <Route path='/use' element={
                <Suspense fallback="Cargando...">
                    <HowUse />
                </Suspense>
              } />
              <Route path='/generate' element={
                <Suspense fallback="Cargando...">
                    <GenerateAI />
                </Suspense>
              } />
           </Route>
           
        </Routes>
    </BrowserRouter>
  )
}
