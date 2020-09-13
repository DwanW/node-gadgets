const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { testUser, testUserId, resetDataBase} = require('./fixtures/db')

beforeEach(resetDataBase)

test('Should create a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Duvalie',
        email: 'dwanw@mail.com',
        password: 'asdaweqwezxc'
    }).expect(201)

    const user = await User.findById(response.body.newUser._id)
    expect(user).not.toBeNull()
    expect(response.body).toMatchObject({
        newUser: {
            name: 'Duvalie',
            email: 'dwanw@mail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('asdaweqwezxc')
})

test('Should login user', async () => {
    const response = await request(app).post('/users/login').send({
        email: testUser.email,
        password: testUser.password
    }).expect(200)

    const user = await User.findById(testUserId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non-existent user', async () => {
    await request(app).post('/users/login').send({
        email: "Bobby",
        password: "imbobbywhoareyou"
    }).expect(400)
})

test('Should not login with bad credentials', async () => {
    await request(app).post('/users/login').send({
        email: 'kunvang@yahoo.com',
        password: "asdklqweasd"
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app).get('/users/profile')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app).get('/users/profile')
        .send()
        .expect(401)
})

//unhandle rej error
test('Should delete authenticated user', async () => {
    await request(app).delete('/user/profile')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(testUserId)
    expect(user).toBeNull()
    
})

test('Should not delete unauthenticated user', async () => {
    await request(app).delete('/user/profile')
        .send()
        .expect(401)
})

test('should upload avatar img', async  () => {
    await request(app).post('/user/profile/avatar')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/developer.png')
        .expect(200)

    const user = await User.findById(testUserId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update user profile', async () => {
    await request(app).patch('/user/profile')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send({ name: 'Sharon'})
        .expect(200)

    const user = await User.findById(testUserId)
    expect(user.name).toEqual('Sharon') 
})

test('should not update invalid field', async () => {
    await request(app).patch('/user/profile')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send({ location: 'thisisnovalid'})
        .expect(400)
})