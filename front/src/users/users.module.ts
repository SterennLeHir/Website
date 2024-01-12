import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { AssociationsModule } from "src/associations/associations.module";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService],
    exports:[UsersService]
})
export class UsersModule{}