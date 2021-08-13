import * as Scrapper from "./src/infrastructure/Scrapper"
import * as dotenv from "dotenv";
dotenv.config();
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { DbExecutions } from "./src/repository/db/db"

let variable = './src' + process.env.DB_NAME_FILE
let db: any = ''
let mock = [
    {
        "category": "Tarjetas de Regalo",
        "products": [
            {
                "coverImage": "https://images-na.ssl-images-amazon.com/images/I/51LvwzJEk8L._AC_UL160_SR160,160_.jpg",
                "author": null,
                "name": "Tarjeta de Regalo Digital Amazon.com.mx",
                "rating": {
                    "value": "4.9 de un máximo de 5 estrellas",
                    "total": "8,138"
                }
            },
            {
                "coverImage": "https://images-na.ssl-images-amazon.com/images/I/41cx6yN%2B%2B7L._AC_UL160_SR160,160_.jpg",
                "author": null,
                "name": "Tarjeta de Regalo Digital Amazon.com.mx",
                "rating": {
                    "value": "4.9 de un máximo de 5 estrellas",
                    "total": "8,138"
                }
            }
        ]
    }
]

test('Generate Connection', async () => {
    db = await open({
        filename: variable,
        driver: sqlite3.Database
    })
    expect(typeof db).toBe('object');
})


test('Get scrapper', async () => {
    try {
        let data = await Scrapper.getDataScrapper()
        expect(typeof data).toBe('object')
    } catch (error) {
        expect(error).toBe(404);
    }
});

test('save collection', async () => {
    let exec = new DbExecutions(db)
    let data = await exec.save(mock)
    expect(data).toBe(true)
    
})