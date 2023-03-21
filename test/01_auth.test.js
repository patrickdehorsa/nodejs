const request = require("supertest")
const app = require("../app")
const { usersModel } = require("../models")
const mongoose = require("mongoose")
const { testAuthLogin, testAuthRegister, testAuthLoginPasswordIncorrect } = require("./helper/helperData");


// Se va a ejec<utar antes de las pruebas
beforeAll( async () => {
    await usersModel.deleteMany();
})

afterAll( () => {
    mongoose.connection.close();
})

describe("[AUTH] esta es la prueba de /api/auth", () => {
    test("esto deberia de retorrnar 404", async () => {
        const response = await request(app)
        .post('/api/auth/login')
        .send(testAuthLogin)

        expect(response.statusCode).toEqual(404)
    }) 

    test("esto deberia de retorrnar 201", async () => {
        const response = await request(app)
        .post('/api/auth/register')
        .send(testAuthRegister)

        expect(response.statusCode).toEqual(201)
        expect(response.body).toHaveProperty("data")
        expect(response.body).toHaveProperty("data.token")
        expect(response.body).toHaveProperty("data.user")
    }) 

    // test("esto deberia de retorrnar 401 password incorrect", async () => {
    //     const response = await request(app)
    //     .post('/api/auth/login')
    //     .send(testAuthLoginPasswordIncorrect)
    //     expect(response.statusCode).toEqual(401)
    // }) 

})