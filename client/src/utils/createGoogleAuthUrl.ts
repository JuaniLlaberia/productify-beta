export const createGoogleAuthUrl = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    redirect_uri: import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URL,
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    promp: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  const urlSearchParams = new URLSearchParams(options);

  return `${rootUrl}?${urlSearchParams.toString()}`;
};
