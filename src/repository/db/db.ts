import { IRead } from "./IRead"
import { IWrite } from "./IWrite"
import { v4 as uuidv4 } from 'uuid';


export class DbExecutions implements IWrite, IRead {
    private db: any
    constructor(db: any) {
        this.db = db
    }


    async save(data: any) {
        try {
            let promises = []
            for (const obj of data) {
                let info = this.insertCategory(obj)
                promises.push(info)
            }
            let info = await Promise.all(promises)
            let promisesProducts = []
            for (const cat of info) {
                const lstProducts = Object.entries(cat.products);
                for (const product of lstProducts) {
                    promisesProducts.push(await this.insertProduct(product[1], cat.id))
                }
            }
            await Promise.all(promisesProducts)
            return true
        } catch (error) {
            return false
        }
    }


    async insertCategory(obj: any) {
        let id = ''
        let sql = `SELECT id FROM CATEGORIES WHERE name = '${obj.category}'`
        let data = await this.db.get(sql)
        if (data === undefined) {
            id = uuidv4()
            let sqlInsert = `INSERT INTO CATEGORIES (id, name) VALUES ('${id}}', '${obj.category}')`
            await this.db.run(sqlInsert)
            obj.id = id
        }
        else {
            obj.id = data.id
        }
        return obj
    }


    async insertProduct(obj: any, id: string) {
        let sqlInsert = `INSERT INTO PRODUCTS (id, idCategory, name, coverImage, author, rating) 
        VALUES ('${uuidv4()}','${id}', '${obj.name}', '${obj.coverImage}', '${obj.author}', '${JSON.stringify(obj.rating)}')`
        let data = await this.db.run(sqlInsert)
        return data
    }

    get: () => string

}
