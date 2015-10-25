module.exports = function (prefix) {
    return function (request) {
        if (request.url[0] === '/') {
            request.url = prefix + request.url;
        }

        return request;
    };
}