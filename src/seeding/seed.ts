import { dbPostgresConfig } from "../config/dbPostgres.config";
import { DataSource, DataSourceOptions } from "typeorm";
import {  runSeeders, SeederOptions } from "typeorm-extension";
import { orderFactory } from "./order.Factory";
import { productFactory } from "./product.Factory";
import { orderDetailFactory } from "./orderDetail.Factory";
import { userFactory } from "./user.Factory";
import { userProfileFactory } from "./userProfile.Fatory";
import { mainSeed } from "./main.Seeder";


const option : DataSourceOptions & SeederOptions = {
    ...dbPostgresConfig,
    factories:[orderFactory,productFactory, orderDetailFactory,userFactory,userProfileFactory],
    seeds: [mainSeed]
}

const dataSource = new DataSource(option);

dataSource.initialize().then( async() => { // khởi tạo kết nối với cơ sở dữ liệu sau đó 
    await dataSource.synchronize(true) // đồng bộ lại cơ sở dữ liệu với các thay đổi trong mô hình
    await runSeeders(dataSource) // chạy tạo dữ liệu mẫu bằng datasource vì datasource đã dc truyền option nên chỉ cần truyền vào và chạy
    process.exit() // kết thúc process
})