export class RequestModel {
    _request = null;
    _chain = null;

    constructor(request) {
        this._request = request;
        this._chain = request;
    }

    get promise() {
        return this._chain;
    }

    set(...args) {
        this._request.set(...args);
    }

    field(...args) {
        this._request.field(...args);
    }

    timeout(ms) {
        this._request.timeout(ms);
    }

    attach(...args) {
        this._request.attach(...args);
    }

    on(...args) {
        this._request.on(...args);
    }

    type(...args) {
        this._request.type(...args);
    }

    send(...args) {
        this._chain = this._request.send(...args).catch(err => {
            if (err.code === 'ABORTED') {
                return new Promise(() => {
                });
            }
            throw err;
        });
    }

    abort() {
        this._request.abort();
    }

    then(...args) {
        this._chain = this._chain.then(...args);
        return this._chain;
    }

    finally(...args) {
        this._chain = this._chain.finally(...args);
        return this._chain;
    }

    catch(...args) {
        this._chain = this._chain.catch(...args);
        return this._chain;
    }
}
