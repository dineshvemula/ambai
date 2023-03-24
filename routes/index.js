'use strict';
const storyRouter = require("./story");
const categoryRouter = require("./category");

module.exports = (app) => {
    app.use('/api/v1/story', storyRouter);
    app.use('/api/v1/category', categoryRouter);
};
