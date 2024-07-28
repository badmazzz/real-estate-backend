import UserRepository from "../repository/user.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserService {
  async createUser(data: any) {
    data.password = await bcrypt.hash(data.password, 10);
    return UserRepository.createUser(data);
  }

  async loginUser(data: any) {
    const user = await UserRepository.findByEmail(data.email);
    if (!user) throw new Error("Invalid email or password");

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) throw new Error("Invalid email or password");

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    return token;
  }

  async getUsers() {
    return UserRepository.getUsers();
  }
}

export default new UserService();
