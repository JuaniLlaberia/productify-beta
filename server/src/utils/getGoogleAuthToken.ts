import qs from 'querystring';

export const getGoogleAuthToken = async (code: string) => {
  const url = 'https://oauth2.googleapis.com/token';

  const vals = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: 'authorization_code',
  };

  try {
    const res: any = await fetch(`${url}?${qs.stringify(vals)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (res.status !== 200) throw new Error('Failed to login using Google.');

    const data = await res.json();
    return data.id_token;
  } catch (err) {
    return err;
  }
};
