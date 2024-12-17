import { factories } from '@strapi/strapi';
import { faker } from '@faker-js/faker';

export default factories.createCoreService('api::task.task', ({ strapi }) => ({

async createTasksInBatches(totalTasks: number, batchSize: number) {
  console.log(`Starting task generation: totalTasks = ${totalTasks}, batchSize = ${batchSize}`);
  let currentBatch = [];
  let totalSaved = 0;

  for (let i = 0; i < totalTasks; i++) {
    currentBatch.push({
      text: faker.music.songName(),
      completed: faker.datatype.boolean(),
    });

    if (currentBatch.length === batchSize || i === totalTasks - 1) {
      console.log(`Saving batch. Batch size: ${currentBatch.length}`);
      await this.saveBatch(currentBatch);
      totalSaved += currentBatch.length;
      currentBatch = [];
    }
  }
    console.log(`Finished task generation. Total tasks saved: ${totalSaved}`);
  },

  // Сохранение одного батча задач в базу данных.
  async saveBatch(batch: any[]) {
    await Promise.all(
      batch.map((task) =>
        strapi.entityService.create('api::task.task', { data: task })
      )
    );
  },

  // Удаление всех задач из базы данных.
  async clearAllTasks() {
    await strapi.db.query('api::task.task').deleteMany({
      where: {},
    });
  },
}));
