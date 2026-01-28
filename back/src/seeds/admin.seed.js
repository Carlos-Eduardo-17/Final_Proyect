import bcrypt from "bcryptjs";
import { User } from "../schemas/user.schema.js";
import { Role } from "../schemas/role.schema.js";

export async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) return;

  const exists = await User.findOne({ email: adminEmail });
  if (exists) return;

  const adminRole = await Role.findOne({ name: "ADMIN" });
  if (!adminRole) throw new Error("Role ADMIN no existe");

  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD,
    10
  );

  await User.create({
    firstName: "Admin",
    lastName: "System",
    email: adminEmail,
    passwordHash,
    role: adminRole._id,
    status: "ACTIVE",
    emailVerified: true,
  });

  console.log("✅ Usuario ADMIN creado");

  /*const userRole = await Role.findOne({ name: "USER" });
  await User.create({
    firstName: "Carlos",
    lastName: "Medina",
    email: "carlos.1710.ml@hotmail.com",
    passwordHash: "clavedeprueba",
    role: userRole._id,
    status: "ACTIVE",
    emailVerified: true,
  });

  console.log("✅ Usuario USER creado");*/
}
