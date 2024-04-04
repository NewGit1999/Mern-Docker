const request = require('supertest');
const app = require('../server'); // assuming your Express app is exported from app.js
const mongoose = require('mongoose');
const User = require('../models/User');

describe('POST /api/users/register', () => {
  // Clear the database before each test
  beforeEach(async () => {
    await User.deleteMany();
  });

  // Test case for registering a new user
  it('should register a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    // Make a POST request to register a new user
    const res = await request(app)
      .post('/api/users/register')
      .send(userData)
      .expect(200);

    // Assertions
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.name).toBe(userData.name);
    expect(res.body.user.email).toBe(userData.email);

    // Check if the user is actually saved in the database
    const savedUser = await User.findOne({ email: userData.email });
    expect(savedUser).toBeTruthy();
    expect(savedUser.name).toBe(userData.name);
  });

  // Test case for missing data
  it('should return 400 if data is missing', async () => {
    const userData = {
      // Missing name intentionally
      email: 'john@example.com',
      password: 'password123',
    };

    await request(app)
      .post('/api/users/register')
      .send(userData)
      .expect(400);
  });

  // Test case for existing email
  it('should return 400 if email already exists', async () => {
    const existingUser = new User({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
    });
    await existingUser.save();

    const userData = {
      name: 'John Doe',
      email: 'jane@example.com', // Reusing existing email intentionally
      password: 'password123',
    };

    await request(app)
      .post('/api/users/register')
      .send(userData)
      .expect(400);
  });
});


