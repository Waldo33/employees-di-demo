import { createRoot } from 'react-dom/client'
import App from './ui/App.tsx'
import { DIContainer } from './di/DIContainer.ts';
import { DIContext } from './ui/context/DIContext.ts';

const container = new DIContainer();

const root = createRoot(document.getElementById('root')!)
root.render(
  <DIContext value={container}>
    <App />
  </DIContext>
)
