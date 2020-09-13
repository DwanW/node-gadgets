const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { testUser, testUserId, resetDataBase, taskThree} = require('./fixtures/db')

beforeEach(resetDataBase)

test('Should create task for user', async() => {
    const response = await request(app).post('/tasks')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send({
            description: 'test task'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('should get all tasks from first test user', async () => {
    const response = await request(app).get('/tasks')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .expect(200)

    expect(response.body.length).toBe(2)
})

test('should not delete task from another user', async () => {
    await request(app).delete('/task/' + taskThree._id)
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .expect(404)

        const task = await Task.findById(taskThree._id)
        expect(task).not.toBeNull()
})