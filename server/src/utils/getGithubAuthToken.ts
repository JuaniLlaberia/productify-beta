import qs from 'querystring';

export const getGithubAuthToken = async (code: string) => {
  const url = 'https://github.com/login/oauth/access_token';
  const vals = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  };

  try {
    const tokenRes = await fetch(`${url}?${qs.stringify(vals)}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });

    if (tokenRes.status !== 200)
      throw new Error('Failed to login using Github.');

    const token = await tokenRes.json();
    return token.access_token;
  } catch (err) {
    return err;
  }
};
