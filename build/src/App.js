"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const packageJson = require("../package.json");
class App {
    /**
     * @param appConfig configuration for app.
     */
    constructor({ controllers, preMiddleware, postMiddleware, host, port, }) {
        this.app = express();
        this.port = port;
        this.host = host;
        this.initDocs();
        this.initMiddleware(preMiddleware);
        this.initControllers(controllers);
        this.initRoot();
        this.initErrorMiddleware(postMiddleware);
    }
    /**
     * initDocs documentation .
     */
    initDocs() {
        this.app.use(express.static("./docs/dist"));
    }
    /**
     * Mount middleware prior to mounting routes.
     *
     * @param middleware array of Middleware to mount prior to all controllers.
     */
    initMiddleware(middleware) {
        for (const ware of middleware) {
            this.app.use(ware);
        }
    }
    /**
     * Mount the router from each each controller.
     *
     * @param controllers array of Controllers
     */
    initControllers(controllers) {
        for (const c of controllers) {
            this.app.use('/', c.router);
        }
    }
    /**
     * Mount middleware after after mounting the routes.
     *
     * @param errorMiddleware array of middleware to mount last.
     */
    initErrorMiddleware(errorMiddleware) {
        for (const ware of errorMiddleware) {
            this.app.use(ware);
        }
    }
    listen() {
        this.app.listen(this.port, this.host, () => {
            console.log(`Listening on http://${this.host}:${this.port}/`);
            console.log(`Check the root endpoint (http://${this.host}:${this.port}/) to see the available endpoints for the current node`);
        });
    }
    /**
     * Mount the root route.
     */
    initRoot() {
        // Set up a root route
        this.app.get('/', (_req, res) => res.send({
            docs: 'https://paritytech.github.io/substrate-api-sidecar/dist',
            github: 'https://github.com/paritytech/substrate-api-sidecar',
            version: packageJson.version,
            listen: `${this.host}:${this.port}`,
            routes: this.getRoutes(),
        }));
    }
    /**
     * Get the routes currently mounted on the Express App. N.B. this uses
     * a private property (`_router`) on the Express App, so it should be
     * checked that this works as expected whenever updating Express dependencies.
     */
    getRoutes() {
        return this.app._router.stack.reduce((acc, middleware) => {
            var _a;
            if (middleware.route) {
                // This middleware is a route mounted directly on the app (i.e. app.get('/test', fn)
                acc.push(this.extractPathAndMethod(middleware.route));
            }
            else if (middleware.name === 'router') {
                // This middleware is an express.Router (i.e. app.use('/', express.Router()))
                (_a = middleware.handle) === null || _a === void 0 ? void 0 : _a.stack.forEach(({ route }) => {
                    if (route) {
                        acc.push(this.extractPathAndMethod(route));
                    }
                });
            }
            return acc;
        }, []);
    }
    /**
     * Helper function for `getRoutes`.
     */
    extractPathAndMethod({ path, methods }) {
        return {
            path,
            method: Object.keys(methods)[0],
        };
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map