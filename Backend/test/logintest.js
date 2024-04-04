const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose');
const User = require('../models/User');

describe('POST /api/auth/login-user', () => {
  // Clear the database before each test
  beforeEach(async () => {
    await User.deleteMany();
  });

  // Test case for successful login
  it('should log in an existing user with correct credentials', async () => {
    // Create a user in the database
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };
    const newUser = new User(userData);
    await newUser.save();

    // Make a POST request to login with correct credentials
    const res = await request(app)
      .post('/api/auth/login-user')
      .send({ email: userData.email, password: userData.password })
      .expect(200);

    // Assertions
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('msg', 'ok');
  });

  // Test case for missing email or password
  it('should return 400 if email or password is missing', async () => {
    await request(app)
      .post('/api/auth/login-user')
      .send({}) // Missing email and password intentionally
      .expect(400);
  });

  // Test case for non-existent user
  it('should return 400 if user does not exist', async () => {
    // Make a POST request to login with non-existent user
    await request(app)
      .post('/api/auth/login-user')
      .send({ email: 'nonexistent@example.com', password: 'password123' })
      .expect(400);
  });

  // Test case for incorrect password
  it('should return 400 if password is incorrect', async () => {
    // Create a user in the database
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };
    const newUser = new User(userData);
    await newUser.save();

    // Make a POST request to login with incorrect password
    await request(app)
      .post('/api/auth/login-user')
      .send({ email: userData.email, password: 'incorrectpassword' })
      .expect(400);
  });
});

