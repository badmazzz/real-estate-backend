import User from "../models/user.models";

class UserRepository {
  async createUser(data: any) {
    const user = new User(data);
    await user.save();
    return user;
  }

  async findByEmail(email: string) {
    return User.findOne({ email });
  }

  async getUsers() {
    return User.find();
  }
}

export default new UserRepository();
