import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository.js";

export async function roleMiddleware(req, res, next) {
    try {
        const token = req.cookies.token; // Obtención del token desde las cookies        

        if (!token) { // Si no hay token es porque no se ha hecho login, y no seguirá avanzando
            return res.status(401).json({ message: "No autenticado" });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET); // Cargar el contenido del payload usando el Secreto        

        const user = await userRepository.findById(payload.userId); // Buscar usuario usando el userId dentro del Payload

        if (user.role.name === "ADMIN" && user.status === "ACTIVE") {
            next();
        } else {
            return res.status(401).json({ message: "Rol inválido: No tiene permisos suficientes" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Rol inválido: No tiene permisos suficientes" });
    }
}
