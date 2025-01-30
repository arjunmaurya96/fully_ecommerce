

import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
// Your Google OAuth credentials
const CLIENT_ID = '243014857247-qs6c15gknoh3hi8d1j48dtlr4j4t8a46.apps.googleusercontent.com';
const CLIENT_SECRET =process.env.GOOGLE_CLIENT_ID;
const REDIRECT_URI = process.env.GOOGLE_CLIENT_SECRET; // Ensure this is correct

// Initialize OAuth2Client
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export const googleAuthController = {


// Redirect user to Google OAuth
googleAuth: async (req, res) => {
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
  });
  res.redirect(authUrl);
},


// Handle Google OAuth callback
googleCallback: async (req, res) => {
  const code = req.query.code; // Get the code from the query params

  // Exchange code for tokens
  client.getToken(code, (err, tokens) => {
    if (err) {
      console.error('Error during authentication:', err);
      return res.status(500).send('Error during authentication');
    }

    // Ensure we received valid tokens
    if (!tokens || !tokens.access_token) {
      return res.status(500).send('Error: No valid access token received');
    }

    // Fetch user information
    axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      }
    })
    .then(response => {
      console.log('User Info:', response.data);
        
        return res.status(200).json({ message: "Login successful!", userInfo:response.data });
    //   res.json(response.data) 

    //   res.status(200).json({
    //     message: 'Login successful!',
        
    //     user: {
    //         name: response.data.name,
    //         username: response.data.email,
    //         picture: response.data.picture,
    //     },
    // });
    })
    .catch(err => {
      console.error('Error fetching user info:', err);
      res.status(500).send('Failed to fetch user info');
    });
  });
}

}