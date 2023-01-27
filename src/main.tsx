import React from 'react'
import ReactDOM from 'react-dom/client'
import { createClient, Provider } from 'urql';
import App from './App'
import './App.css'
import { getToken } from './storage'

const client = createClient({
  url: import.meta.env.VITE_API_URL || 'http://localhost:8000/graphql',
  fetchOptions: () => {
    const token = getToken()
    return {
      headers: { authorization: token ? `JWT ${token}` : '' }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
)
