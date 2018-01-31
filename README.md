
This is project sample about nodejs with mysql use lib Sequelize for handler ORM.

initialization Sequelize:

var sequelize = new Sequelize(config.database, config.username, config.password, config);

## Example load data model:

var fs = require("fs");

    fs.readdirSync(appDir)

      .filter(function (file) {

        return (file.indexOf(".") !== 0);
    })

    .forEach(function (file) {
        var model = sequelize.import(path.join(appDir, file));
        db[model.name] = model;
    });
## Generation auto SQL to model
    sequelize-auto -o "./models" -d sequelize_auto_test -h localhost -u my_username -p 5432 -x my_password -e postgres


