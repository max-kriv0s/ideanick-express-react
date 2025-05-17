import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { getAllIdeasRoute, getViewIdeaRoute, ViewIdeaRouteParams } from './lib/routes';
import { TrpcProvider } from './lib/trpc';
import { AllIdeasPage } from './pages/AllIdeaPage';
import { ViewIdeaPage } from './pages/ViewIdeaPage';

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getAllIdeasRoute()} element={<AllIdeasPage />}></Route>
            <Route path={getViewIdeaRoute(ViewIdeaRouteParams)} element={<ViewIdeaPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
