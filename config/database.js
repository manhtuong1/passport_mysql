module.exports = {
    'development': {
        'username': 'root',
        'password': 'root',
        'database': 'my_db',
        'host': '127.0.0.1',
        'dialect': 'mysql',
        'pool': {
            'max': 5,
            'min': 0,
            acquire: 30000,
            'idle': 10000
        }
    },

    'test': {
        'username': '',
        'password': null,
        'database': '',
        'host': '',
        'dialect': 'mysql'

    },
    'production': {
        'username': '',
        'password': null,
        'database': '',
        'host': '127.0.0.1',
        'dialect': 'mysql'
    }

};