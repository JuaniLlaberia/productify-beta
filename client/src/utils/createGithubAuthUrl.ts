export const createGithubAuthUrl = () => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${
    import.meta.env.VITE_GITHUB_CLIENT_ID
  }&scope=user:email`;

  return githubAuthUrl;
};
