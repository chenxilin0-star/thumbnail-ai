module.exports = {
  apps: [
    {
      name: 'jimeng-api',
      cwd: '/root/jimeng-api',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'production',
        PORT: 5100,
      },
      listen_timeout: 10000,
      kill_timeout: 5000,
      restart_delay: 1000,
      max_restarts: 10,
    },
    {
      name: 'thumbnail-ai',
      cwd: '/root/.openclaw/workspace/projects/thumbnail-ai',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      listen_timeout: 10000,
      kill_timeout: 5000,
      restart_delay: 1000,
      max_restarts: 10,
    },
  ],
}
