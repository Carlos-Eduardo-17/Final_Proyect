import { User } from "../schemas/user.schema.js";

export const userRepository = {
  findAll() {
    return User.find({ deletedAt: null }).populate("role");
  },

  findById(id) {    
    return User.findOne({ _id: id, deletedAt: null }).populate("role");
  },

  findByEmail(email) {
    return User.findOne({
      email: email.toLowerCase(),
      deletedAt: null,
    }).populate("role");
  },

  findByEmailWithPassword(email) {
    return User.findOne({
      email: email.toLowerCase(),
      deletedAt: null,
    })
      .select("+passwordHash") // Respeta esto del schema: select: false. El password solo entra cuando uno lo pide explícitamente
      .populate("role"); // Simplifica services. Evita repetir queries. Más legible
  },

  create(data) {
    return User.create(data);
  },

  updateById(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true });
  },

  softDeleteById(id) {
    return User.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );
  },

  verifyEmail(userId) {
    return User.findByIdAndUpdate(
      userId,
      {
        status: "ACTIVE",
        emailVerified: true,
        verificationCode: null,
        verificationCodeExpiresAt: null,
      },
      { new: true }
    );
  },

  setResetPasswordToken(userId, token, expiresAt) {
    return User.findByIdAndUpdate(
      userId,
      {
        resetPasswordToken: token,
        resetPasswordExpiresAt: expiresAt,
      },
      { new: true }
    );
  },

  findByResetToken(token) {
    return User.findOne({
      resetPasswordToken: token,
      deletedAt: null,
    });
  },

  updatePassword(userId, passwordHash) {
    return User.findByIdAndUpdate(
      userId,
      {
        passwordHash,
        resetPasswordToken: null,
        resetPasswordExpiresAt: null,
        lastPasswordChangeAt: new Date(),
      },
      { new: true }
    );
  },

};
