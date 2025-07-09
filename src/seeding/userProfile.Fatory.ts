import { faker } from "@faker-js/faker";
import { UserProfile } from "src/user-profile/entities/user-profile.entity";
import { setSeederFactory } from "typeorm-extension";


export const userProfileFactory = setSeederFactory(UserProfile , () =>{
    const userProfile = new UserProfile();

    userProfile.socialUrl = faker.internet.url();
    userProfile.avatarUrL = faker.image.avatar();
    userProfile.brithDay = faker.date.birthdate();
    userProfile.sex = faker.person.sexType();
    return userProfile
})