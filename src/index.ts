import * as dotenv from "dotenv";
dotenv.config();
import { SQLiteAdapter } from "./infrastructure/SQLiteAdapter"
import * as Scrapper from "./infrastructure/Scrapper"
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { DbExecutions } from './repository/db/db'



let variable = __dirname + process.env.DB_NAME_FILE
open({
    filename: variable,
    driver: sqlite3.Database
}).then(async (db) => {
    const sqlite = new SQLiteAdapter(db)
    try {
        let data = await Scrapper.getDataScrapper()
        console.log(JSON.stringify(data))
        let exec = new DbExecutions(db)
        exec.save(data)
    } catch (error) {
        console.error("Amazon block url, execute again")
    }

})
