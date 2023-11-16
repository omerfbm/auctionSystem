import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.Password, 10);
    const createdUser = new this.userModel({ ...createUserDto, Password: hashedPassword });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(updateUserDto.Password, 10);
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { ...updateUserDto, Password: hashedPassword },
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return deletedUser;
  }

  async findByRole(role: string): Promise<User[]> {
    return this.userModel.find({ Role: role }).exec();
  }

  async login(loginUserDto: CreateUserDto){
    const { UserName, Password } = loginUserDto;
    const user = await this.userModel.findOne({ UserName }).exec();

    if (!user || !(await bcrypt.compare(Password, user.Password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.UserName, sub: user.id };
    const token = this.jwtService.sign(payload);

  return {token,user};
  }
}
