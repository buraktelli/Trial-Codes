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
            ["migrations-dir"]: './databases/admin/migrations/',
            table: 'migration-table'
        },
    });
    const dbmigrateData = await DBMigrate.getInstance(true, {
        env: 'data',
        config: config,
        cmdOptions: {
            ["sql-file"]: true,
            ["migrations-dir"]: './databases/data/migrations/',
            table: 'migration-table',
        },
    });
    // await dbmigrateAdmin.silence(true);
    // await dbmigrateAdmin.reset()
    // await dbmigrateData.reset()

    await dbmigrateAdmin.create('initialize');
    // await dbmigrateData.create('initialize');

    await dbmigrateAdmin.up()
    await dbmigrateData.up()
    // await dbmigrateAdmin.sync('20211001080703-v3')
    // await dbmigrateAdmin.up(2)
    // await dbmigrateAdmin.up('20211001080703-v4')
    // await dbmigrateAdmin.down()

    process.exit(1)
}
deneme()
