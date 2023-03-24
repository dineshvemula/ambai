'use strict';
const storyRouter = require("./story");
const categoryRouter = require("./category");
const authRouter = require("./auth");

module.exports = (app) => {
    app.use('/api/v1/story', storyRouter);
    app.use('/api/v1/category', categoryRouter);
    app.use('/api/v1/auth', authRouter);
};
