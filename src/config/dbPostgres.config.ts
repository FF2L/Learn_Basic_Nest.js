import { Product } from "src/products/entities/product.entity";
import { UserProfile } from "src/user-profile/entities/user-profile.entity";
import { User } from "src/users/entities/user.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";


export const dbPostgresConfig: PostgresConnectionOptions = {
    url: '',
    type: 'postgres',
    // autoloadEntities: true, //tự động load các entity
    entities: [User,UserProfile,Product],
    port: 5432, //cổng kết nối database ko cần cũn dc vì url có rồi
    synchronize: true, //đồng bộ cở sở dữ liệu với database nghĩa là nếu entity mất column nào thì nó sẽ tự xóa cột đó trong database chỉ sử dụng khi dev
      extra: {
    family: 4, // ép dùng IPv4
  },
}