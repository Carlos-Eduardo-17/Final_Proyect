/*
obtener usuarios
bloquear / desbloquear
soft delete
cambiar rol (admin)
ver perfil propio
 No login
 No JWT
 No password (eso es auth)
*/

import { userRepository } from "../repositories/user.repository.js";
import { roleRepository } from "../repositories/role.repository.js";

export const userService = {
  async findAll() {
    return userRepository.findAll();
  },

  async findById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  },

  async getProfile(userId) {
    return this.findById(userId);
  },

  async changeRole(userId, roleName) {
    const role = await roleRepository.findByName(roleName);
    if (!role) {
      throw new Error("Rol inválido");
    }

    return userRepository.updateById(userId, { role: role._id });
  },

  async block(userId) {
    return userRepository.updateById(userId, { status: "BLOCKED" });
  },

  async activate(userId) {
    return userRepository.updateById(userId, { status: "ACTIVE" });
  },

  async remove(userId) {
    return userRepository.softDeleteById(userId);
  },
};
