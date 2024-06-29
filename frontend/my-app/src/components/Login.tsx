import React, { useState } from 'react';

function Login() {
  return (
    <div>
      <h1>Spotify Recommendation</h1>
      <button onClick={() => {
        redirectToAuthCodeFlow(process.env.REACT_APP_CLIENT_ID || '')
      }}>Login with Spotify</button>
    </div>
  )
}

export async function redirectToAuthCodeFlow(clientId: string) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem('verifier', verifier);

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('response_type', 'code');
  params.append('redirect_uri', `${process.env.REACT_APP_DOMAIN}/callback`);
  params.append('scope', 'user-read-private user-read-email user-top-read');
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getAccessToken(clientId: string, code: string) {
  if (!code) return
  const verifier = localStorage.getItem('verifier');

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', `${process.env.REACT_APP_DOMAIN}/callback`);
  params.append('code_verifier', verifier!);

  const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
  })

  const { access_token } = await result.json()
  if (access_token && access_token.length > 9) {
    localStorage.setItem('spotifyAuth', access_token)
    window.location.href = '/'
  }
}

function generateCodeVerifier(length: number) {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
}

export default Login;