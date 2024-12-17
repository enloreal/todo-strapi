export default {
  async seed(ctx: any) {
    const { faker } = require('@faker-js/faker');
    
    try {
      const tasks = [];
      

      for (let i = 0; i < 100000; i++) {
        tasks.push({
          text: faker.music.songName(),
          completed: faker.datatype.boolean(),
        });
      }


      const batchSize = 1000;
      for (let i = 0; i < tasks.length; i += batchSize) {
        const batch = tasks.slice(i, i + batchSize);
        await Promise.all(
          batch.map(task => 
            strapi.service('api::task.task').create({ data: task })
          )
        );
      }

      return ctx.send({ 
        message: '100 000 tasks created successfully'
      });
    } catch (error) {
      return ctx.badRequest('Error creating tasks', { error });
    }
  },
async clear(ctx: any) {
    try {
      const result = await strapi.db.query('api::task.task').deleteMany({
        where: {}
      });
      
      return ctx.send({
        message: 'All tasks deleted successfully',
      });
    } catch (error) {
      return ctx.badRequest('Error deleting tasks', { error });
    }
}
};
