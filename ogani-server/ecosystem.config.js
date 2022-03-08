/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  apps: [
    {
      name: 'ogani-server',
      script: './dist/main.js',
      cwd: './',
      args: '',
      watch: true,
      ignore_watch: ['node_modules', 'public', 'logs'],
      exec_mode: 'cluster_mode',
      instances: '2',
      autorestart: true,
      max_memory_restart: '1G',
      error_file: './logs/app-err.log',
      out_file: './logs/app-out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      min_uptime: '60s',
      max_restarts: 30,
      restart_delay: 60,
      node_args: '--require dotenv/config',
      env: {
        NODE_ENV: 'development',
        DOTENV_CONFIG_PATH: '.env.development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_test: {
        NODE_ENV: 'test',
      },
    },
  ],
  // deploy: {
  //   production: {
  //     user: 'root',
  //     host: '39.108.99.86',
  //     ref: 'origin/master',
  //     repo: 'git@github.com:repo.git',
  //     path: '/var/www/AnJiaMallServer',
  //     'post-deploy':
  //       'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
  //   },
  // },
};
