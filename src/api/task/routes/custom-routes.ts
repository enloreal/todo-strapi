export default {
  routes: [
    {
      method: 'GET', 
      path: '/tasks/seed',
      handler: 'seed.seed',
    },
    {
      method: 'GET',
      path: '/tasks/clear',
      handler: 'seed.clear',
    },
  ],
};
