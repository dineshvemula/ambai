'use strict';
const storyRouter = require("./story");
const storyTypeRouter = require("./story-type");
const storyEpisodeRouter = require("./story-episode");
const storyDetailsRouter = require("./story-details");
const categoryRouter = require("./category");
const tagRouter = require("./tags");
const authRouter = require("./auth");

module.exports = (app) => {
    app.use('/api/v1/story', storyRouter);
    app.use('/api/v1/story-type', storyTypeRouter);
    app.use('/api/v1/story-episode', storyEpisodeRouter);
    app.use('/api/v1/story-details', storyDetailsRouter);
    app.use('/api/v1/category', categoryRouter);
    app.use('/api/v1/tags', tagRouter);
    app.use('/api/v1/auth', authRouter);
};
