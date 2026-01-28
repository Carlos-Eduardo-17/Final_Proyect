import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository.js";

export async function authMiddleware(req, res, next) {  
  try {
    const token = req.cookies.token; // Obtención del token desde las cookies

    if (!token) { // Si no hay token es porque no se ha hecho login, y no seguirá avanzando
      return res.status(401).json({ message: "No autenticado" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET); // Cargar el contenido del payload usando el Secreto

    const user = await userRepository.findById(payload.userId); // Buscar usuario usando el userId dentro del Payload

    if (!user || user.status !== "ACTIVE") { // Si no existe el Usuario o si no está ACTIVE, no seguirá avanzando
      return res.status(401).json({ message: "Usuario inválido" });
    }

    req.user = user; // Inyectar en la request el objeto usuario encontrado
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}
