module.exports = {
  apps : [{
    name: 'server',
    script: 'server/server.js',
    autorestart: true,
    watch: true,
    instances: 'max',
    exec_mode: 'cluster',    
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      DATABASE_URI: 'mongodb://127.0.0.1:27017',
      DATABASE_NAME: '',
      EMAIL_LOGIN: '',
      EMAIL_PASSWORD: '',
      QIWI_SECRET_KEY: ''
    }
  }],
};
