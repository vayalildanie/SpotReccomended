import { useEffect } from 'react';
import './App.css';
import Login, { getAccessToken } from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  useEffect(() => {
    getToken()
  })

  const getToken = () => {
    if (window.location.search.includes('code') && !localStorage.getItem('spotifyAuth')) {
      const code = new URLSearchParams(window.location.search).get('code')
      if (code) {
        getAccessToken(process.env.REACT_APP_CLIENT_ID || "", code)
      }
    }
  }

  return (
    <div className="App">
      {localStorage.getItem('spotifyAuth') ? <Dashboard /> : <Login />}
    </div>
  )
}

export default App;
