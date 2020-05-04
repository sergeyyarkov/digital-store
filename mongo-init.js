db.createUser({
  user: 'root',
  pwd: 'secret',
  roles: [
    {
      role: 'readWrite',
      db: 'digital_store',
    },
  ],
})
