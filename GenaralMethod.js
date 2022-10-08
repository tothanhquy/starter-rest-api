exports.getResRouterObject = function() {
    return {
        code: -1,
        error: "error",
        data: []
    }
}

exports.getResModelObject = function() {
    return {
        code: -1,
        error: "error",
        data: {},
        effectedRows: 0
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