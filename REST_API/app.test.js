const request = require ('supertest')
const {app} = require('./server')

describe("POST /register", () => {
  describe("given a username and password", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/register").send({
        username: "testUser" + Math.floor(Math.random()*100),
        email: "testUser"+ Math.floor(Math.random()*100) + "@mail" ,
        password: "password",
        passwordConfirm : "password"
      })
      expect(response.statusCode).toBe(200)
    })
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/register").send({
        username: "testUser",
        email: "testUser@mail" + Math.floor(Math.random()*100),
        password: "password",
        passwordConfirm : "password"
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    // test("response has userId", async () => {
    //   const response = await request(app).post("/users").send({
    //     username: "username",
    //     password: "password"
    //   })
    //   expect(response.body.userId).toBeDefined()
    // })
  })
})

describe("POST /login", () => {
  describe("given a username and password", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/login").send({
        email: "testUser@mail" ,
        password: "password",
      })
      expect(response.statusCode).toBe(200)
    })
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/login").send({
        email: "testUser@mail" ,
        password: "krvipsw",
      })
      expect(response.statusCode).toBe(401)
    })
    // test("response has userId", async () => {
    //   const response = await request(app).post("/users").send({
    //     username: "username",
    //     password: "password"
    //   })
    //   expect(response.body.userId).toBeDefined()
    // })
  })
})

describe("GET /getStories", () => {
  describe("given a username and password", () => {

    test("should specify json in the content type header", async () => {
      const response = await request(app).get("/getStories")
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    // test("response has userId", async () => {
    //   const response = await request(app).post("/users").send({
    //     username: "username",
    //     password: "password"
    //   })
    //   expect(response.body.userId).toBeDefined()
    // })
  })
})

describe("GET /getTrendingStories", () => {
  describe("given a username and password", () => {

    test("should specify json in the content type header", async () => {
      const response = await request(app).get("/getTrendingStories")
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })

    // test("response has userId", async () => {
    //   const response = await request(app).post("/users").send({
    //     username: "username",
    //     password: "password"
    //   })
    //   expect(response.body.userId).toBeDefined()
    // })
  })
})