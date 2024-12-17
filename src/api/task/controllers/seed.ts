export default {

  async seed(ctx: any) {
    const taskService = strapi.service('api::task.task');
    const totalTasks = parseInt(ctx.query.count, 10) || 1000; 
    const batchSize = 500;

    try {
      await taskService.createTasksInBatches(totalTasks, batchSize);

      return ctx.send({
        message: `${totalTasks} tasks created successfully`,
      });
    } catch (error) {
      return ctx.badRequest('Error creating tasks', { error });
    }
  },

  async clear(ctx: any) {
    const taskService = strapi.service('api::task.task');

    try {
      await taskService.clearAllTasks();

      return ctx.send({
        message: 'All tasks deleted successfully',
      });
    } catch (error) {
      return ctx.badRequest('Error deleting tasks', { error });
    }
  },
};
