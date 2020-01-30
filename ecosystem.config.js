module.exports = {
  apps : [{
    name: 'server',
    script: 'config/server.js',
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      DATABASE_URI: '',
      DATABASE_NAME: '',
      EMAIL_LOGIN: '',
      EMAIL_PASSWORD: '',
      QIWI_SECRET_KEY: ''
    }
  }],
};
