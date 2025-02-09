import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { App } from './App.tsx'

import { DIContainer } from '../infrastructure/di/DIContainer.ts'
import { createAppStore } from './store/index.ts';

const container = new DIContainer();
const store = createAppStore(container);

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);