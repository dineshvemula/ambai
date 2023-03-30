'use strict';
const storyRouter = require("./story");
const storyTypeRouter = require("./story-type");
const categoryRouter = require("./category");
const tagRouter = require("./tags");
const authRouter = require("./auth");

module.exports = (app) => {
    app.use('/api/v1/story', storyRouter);
    app.use('/api/v1/story-type', storyTypeRouter);
    app.use('/api/v1/category', categoryRouter);
    app.use('/api/v1/tag', tagRouter);
    app.use('/api/v1/auth', authRouter);
};
