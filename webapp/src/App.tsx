import { TrpcProvider } from './lib/trpc';
import { AllIdeasPage } from './pages/AllIdeaPage';

export const App = () => {
  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  );
};
