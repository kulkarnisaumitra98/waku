import { new_defineEntries } from 'waku/minimal/server';
import { Slot } from 'waku/minimal/client';

import App from './components/app.js';

const entries: ReturnType<typeof new_defineEntries> = new_defineEntries({
  unstable_handleRequest: async (input, { renderRsc, renderHtml }) => {
    if (input.type === 'component') {
      return renderRsc({ App: <App /> });
    }
    if (input.type === 'function') {
      const value = await input.fn(...input.args);
      return renderRsc({ _value: value });
    }
    if (input.type === 'custom' && input.pathname === '/') {
      return renderHtml({ App: <App /> }, <Slot id="App" />, '');
    }
  },
  unstable_getBuildConfig: async () => [
    { pathSpec: [], entries: [{ rscPath: '' }] },
  ],
});

export default entries;
