import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import * as routes from './lib/routes';
import { TrpcProvider } from './lib/trpc';
import { AllIdeasPage } from './pages/AllIdeaPage';
import { NewIdeaPage } from './pages/NewIdeaPage';
import { ViewIdeaPage } from './pages/ViewIdeaPage';
import './styles/global.scss';

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />}></Route>
            <Route path={routes.getViewIdeaRoute(routes.ViewIdeaRouteParams)} element={<ViewIdeaPage />}></Route>
            <Route path={routes.getNewIdeaRouter()} element={<NewIdeaPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
