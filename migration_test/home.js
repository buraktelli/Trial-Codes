const DBMigrate = require('db-migrate');

async function deneme() {
    const config = {
        "admin": {
          "driver": "pg",
          "user": "postgres",
          "password": "anka_vision",
          "host": "192.168.20.218",
          "database": "burak_cloud_admin"
        },
        "data": {
            "driver": "pg",
            "user": "postgres",
            "password": "anka_vision",
            "host": "192.168.20.218",
            "database": "burak_cloud_data"
          }
    }
    const dbmigrateAdmin = await DBMigrate.getInstance(true, {
        env: 'admin',
        config: config,
        cmdOptions: {
            ["sql-file"]: true,
            table: 'migration-table'
        },
    });
    const dbmigrateData = await DBMigrate.getInstance(true, {
        env: 'data',
        config: config,
        cmdOptions: {
            ["sql-file"]: true,
            ["migrations-dir"]: './migrations/data/data',
            table: 'migration-table',

        },
    });
    // await dbmigrateAdmin.silence(true);
    await dbmigrateAdmin.reset()
    await dbmigrateData.reset()
    // await dbmigrateAdmin.create();
    // await dbmigrateData.create('initialize', 'data');
    
    // await dbmigrateAdmin.up()
    await dbmigrateData.up()
    // await dbmigrateAdmin.sync('20211001080703-v2')
    // await dbmigrateAdmin.up(2)
    // await dbmigrateAdmin.up('20211001080703-v4')
    // await dbmigrateAdmin.down()
    // console.log(output);

    // process.exit(1)
}
deneme()
