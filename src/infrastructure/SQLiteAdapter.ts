import { IObtainScrapper } from "../domain/IObtainScrapper";

export class SQLiteAdapter implements IObtainScrapper {
    private db: any
    constructor (db: any ) {
        this.db = db
        this.createTables().then(done=>{
            console.log("Table created")
        })
    }
    async createTables(){
        await this.db.exec(`CREATE TABLE IF NOT EXISTS PRODUCTS(
                    id         CHAR(200) PRIMARY KEY     NOT NULL,
                    idCategory CHAR(200),
                    name       CHAR(200)    NOT NULL,
                    coverImage CHAR(200)     NOT NULL,
                    author     CHAR(200),
                    rating     CHAR(200)
                )`)
                await this.db.exec(`CREATE TABLE IF NOT EXISTS CATEGORIES(
                    id         CHAR(200) PRIMARY KEY     NOT NULL,
                    name       CHAR(200)    NOT NULL
                )`)
    }
}
