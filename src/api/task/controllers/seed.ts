export default {
  async seed(ctx: any) {
    // FIXME нет необходимости импортировать данный модуль при каждом запросе
    const { faker } = require('@faker-js/faker');
    
    try {
      // FIXME контроллер не должен содержать бизнес-логику
      const tasks = [];
      

      // FIXME зачем хранить данный массив? Можно и без него обойтись
      for (let i = 0; i < 100000; i++) {
        tasks.push({
          text: faker.music.songName(),
          completed: faker.datatype.boolean(),
        });
      }


      // FIXME логику батчинга вынести в отдельную функцию
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
        // FIXME если я попрошу изменить количество с 100к на 10к, а потом на 1м?
        //  Подобные запросы могут возвращать например { message: 'OK' }
        message: '100 000 tasks created successfully'
      });
    } catch (error) {
      return ctx.badRequest('Error creating tasks', { error });
    }
  },
async clear(ctx: any) {
    try {
      // FIXME контроллер не должен содержать бизнес-логику.
      //  Обращение к БД это явный признак бизнес логики
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
