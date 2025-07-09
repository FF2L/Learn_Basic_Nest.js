import { faker, Faker } from "@faker-js/faker";
import { User } from "src/users/entities/user.entity";
import { setSeederFactory } from "typeorm-extension";


export const userFactory = setSeederFactory(User,() =>{
    const user = new User();
    
    user.name = faker.person.fullName();
    user.email = faker.internet.email();
    user.age = faker.number.int({min: 18, max: 80})
    
    return user;
})