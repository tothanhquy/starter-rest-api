exports.getResRouterObject = function(code = -1, error = "error", data = {}) {
    return {
        code: code,
        error: error,
        data: data
    }
}

exports.getResModelObject = function(code = -1, error = "error", data = {}, effectedRows = 0) {
    return {
        code: code,
        error: error,
        data: data,
        effectedRows: effectedRows
    }
}

exports.activeDatabaseServer = function(sql) {
    const HOST = "minilemon.000webhostapp.com";
    const ACCESS_TOKEN = "mzsmdjkmzkjnsehuyqawhhyg54o6h1lj61fz1rh11xc8sr1jvjv";
    let resOj = {
        code: -1,
        data: {}
    }
    try {

    } catch (err) {

    }
    return resOj;
}

exports.generatorString = function(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}