import { faker } from "@faker-js/faker";
import { Order } from "src/order/entities/order.entity";
import { OrderDetail } from "src/order_detail/entities/order_detail.entity";
import { Product } from "src/products/entities/product.entity";
import { UserProfile } from "src/user-profile/entities/user-profile.entity";
import { User } from "src/users/entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";


export class mainSeed implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        
        console.log("tạo dữ liệu product-----------")
        const produtFactoryRepo = dataSource.getRepository(Product)
        const productFactory = factoryManager.get(Product)
        const products_1 = await produtFactoryRepo.save([
            {name: "Ban ghe vip" , type: "ban", price: 10000},
            {name: "Giuong go vip" , type: "giuong", price: 8000}
        ])
        const product_2 = await productFactory.saveMany(8)
        const products = [...products_1, ...product_2] // gộp 2 mảng lại với nhau

        console.log("tạo dữ liệu user_Profile--------")
        const userProfileFactory = factoryManager.get(UserProfile)
        const userProfiles = await userProfileFactory.saveMany(10)

        console.log("tạo dữ liệu người dùng--------")
        const userFactory = factoryManager.get(User) // nó sẽ tìm trong file xem file nào ó setSeedFactory nào có kiểu User
        const orderFactry = factoryManager.get(Order) 
        const users = await Promise.all( // map là hàm đồng bộ và nó làm xng việc này tời việc khác ko chờ 
                                    // callback của async nhưng các phần tử là bất động bộ khi đó map sẽ
                                    //  làm tất cả công việc song song, promise.all là để đảm bảo tất cả công việc hoàn thành mới trả về kết quả 
            Array(10).fill("").map(async () =>{ //array(10) là taọ mảng 10 phần tử rỗng túc là underfine và fill dùng để biến mỗi phần tử đó thành ""
                const user = await userFactory.make({ //make là để tạo instance mà ko lưu vào db
                    userProfile: faker.helpers.arrayElement(userProfiles), //lấy ngẫu nhiện trng mang userProfiles
                    products: faker.helpers.arrayElements(products, {min: 1, max: 3}), // lấy ngẫu nhiên từ mảng products từ 1 đến 3 sản phẩm
                    order: Promise.resolve(await orderFactry.saveMany(2) )// tạo 2 đơn hàng cho mỗi người dùng và biến nó thành promise để gán giá trị dc                    
                })
                return user
            })
        )
        const userRepo = dataSource.getRepository(User)
        await userRepo.save(users)




    }}