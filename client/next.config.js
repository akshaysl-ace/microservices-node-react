// This Config tells NextJS to poll all updated files once per 300 sec time period to sync files in Browser.

module.exports = {
    webpackDevMiddleware: (config) => {
        config.watchOptions.poll = 300;
        return config;
    }
};