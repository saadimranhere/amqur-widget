import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App';
import type { AmqurWidgetConfig } from './types';
import { bootstrapWidget } from './bootstrap';

let mounted = false;

export async function mountWidget(config: AmqurWidgetConfig) {
  if (mounted) return;
  mounted = true;

  const host = document.createElement('div');
  host.id = 'amqur-connect-root';
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: 'open' });

  const container = document.createElement('div');
  shadow.appendChild(container);

  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after {
      box-sizing: border-box;
      font-family: system-ui, -apple-system, BlinkMacSystemFont;
    }
  `;
  shadow.appendChild(style);

  const bootstrap = await bootstrapWidget(config);

  createRoot(container).render(
    <React.StrictMode>
      <App config={config} bootstrap={bootstrap} />
    </React.StrictMode>
  );
}
