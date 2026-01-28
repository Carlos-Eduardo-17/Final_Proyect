## CICLO NORMAL

1.  Inicio de Aplicación:

    Automáticamente (por seed).
    
    Se crean dos roles y un usuario:

    - Rol USER
    - Rol ADMIN
    - Usuario con rol ADMIN

2. Registrarse en el sistema:

    POST http://localhost:3000/auth/register
    
        {        
            "firstName":"Luciana",
            "lastName":"Sanchez",
            "email":"gaviluz794@gmail.com",
            "password": "123456789"    
        }

    - Se crea una cuenta aún no activada.
    - Se envía automáticamente un código de verificación al correo indicado.

    Retorna

        

3. Verificar Correo:

    POST http://localhost:3000/auth/verify-email

        {    
            "email":"gaviluz794@gmail.com",
            "code": "572458"
        }

    - Se activa la cuenta y permite el logueo.

    Retorna

        {
            "message": "Cuenta verificada correctamente. Ya puedes iniciar sesión."
        }

4. Login:

    POST http://localhost:3000/auth/login

        {    
            "email":"gaviluz794@gmail.com",
            "password": "123456789"    
        }
    
    - Se ingresa exitosamente al sistema.
    - Se crea automáticamente un Token almacenado en las cookies

    Retorna

        {
            "message": "Login exitoso",
            "user": {
                "id": "69794b0b0bf1ef02ca9fbc1a",
                "email": "gaviluz794@gmail.com",
                "role": "USER"
            }
        }

5. Agregar un item al carrito:

    POST http://localhost:3000/cart/items

        {
            "bookId":"69794e920bf1ef02ca9fbc29",
            "quantity": 2
        }
    
    - El carrito se creará automáticamente al agregar items en él.
    - El carrito estará ACTIVO

    Retorna

        {
            "cart": "69794f950bf1ef02ca9fbc34",
            "book": "697950b30bf1ef02ca9fbc3b",
            "quantity": 1,
            "_id": "697950cd0bf1ef02ca9fbc44",
            "createdAt": "2026-01-27T23:57:01.474Z",
            "__v": 0
        }

6. Crear una orden de compra:

    POST http://localhost:3000/orders/

        {
            "couponCode":"50OFF"
        }
    
    - Se cambia el estado de ACTIVO a CONVERTIDO del carrito.
    - Se puede agregar un cupón

    Retorna

        {
            "user": "69794b0b0bf1ef02ca9fbc1a",
            "status": "PENDING",
            "coupon": {
                "_id": "69794ee40bf1ef02ca9fbc2c",
                "code": "50OFF",
                "discountType": "PERCENTAGE",
                "discountValue": 50,
                "maxUses": 3,
                "usedCount": 0,
                "expiresAt": "2026-05-20T15:30:00.000Z",
                "isActive": true,
                "deletedAt": null,
                "createdAt": "2026-01-27T23:48:52.987Z",
                "updatedAt": "2026-01-27T23:48:52.987Z",
                "__v": 0
            },
            "subtotal": 39.97,
            "discountTotal": 19.985,
            "total": 19.985,
            "_id": "6979513f0bf1ef02ca9fbc4c",
            "createdAt": "2026-01-27T23:58:55.920Z",
            "updatedAt": "2026-01-27T23:58:55.920Z",
            "__v": 0
        }

7. Intentar pagar la orden de compra:

    POST http://localhost:3000/payments/intent

        {
        "orderId": "6979513f0bf1ef02ca9fbc4c"
        }

    - Devolverá un clientSecret (que es la unión de paymentIntentId + secret)

    Retorna

        {
            "clientSecret": "pi_3SuMCt0NOlpjpcga1OO5RYLg_secret_SaS4fkoIvHcnVwkxXxnxyhxGm"
        }

8. Simular pago (sin frontend):

    POST http://localhost:3000/payments/confirm

        {
        "orderId": "6979513f0bf1ef02ca9fbc4c",
        "paymentIntentId": "pi_3SuFYW0NOlpjpcga0SB0Vu08"
        }

    - Stripe requiere frontend para confirmación real. En este proyecto backend se simula la confirmación y se valida el flujo completo.

    Retorna

        {
            "message": "Pago confirmado",
            "order": {
                "_id": "6979513f0bf1ef02ca9fbc4c",
                "user": {
                    "_id": "69794b0b0bf1ef02ca9fbc1a",
                    "firstName": "Luciana",
                    "lastName": "Sanchez",
                    "email": "gaviluz794@gmail.com"
                },
                "status": "PENDING",
                "coupon": "69794ee40bf1ef02ca9fbc2c",
                "subtotal": 39.97,
                "discountTotal": 19.985,
                "total": 19.985,
                "createdAt": "2026-01-27T23:58:55.920Z",
                "updatedAt": "2026-01-27T23:58:55.920Z",
                "__v": 0
            }
        }

9. Cerrar sesión

    POST http://localhost:3000/auth/logout

    Retorna

        {
            "message": "Logout exitoso"
        }

## CASOS DE USO

### Reestablecer contraseña

1. Solicitar código de verificación al correo:

    POST http://localhost:3000/auth/forgot-password

        {    
            "email":"cindy.89a@gmail.com"   
        } 
    
    - Se envía automáticamente un token de verificación al correo indicado.

2. Establecer nueva contraseña:

    POST http://localhost:3000/auth/reset-password

        {    
            "token":"65e676038c194396698e86aeacc58b1e23fc536ec0325b3275ddddc4928acfe5",
            "newPassword": "perrosogatos123"
        }
    
    - Se establece la nueva contraseña y permite volver a iniciar sesión.

## MANTENIMIENTO DEL SISTEMA

1. Crear tags:

    POST http://localhost:3000/tags/

        {
            "name": "Terror"
        }

    Retorna

        {
            "name": "terror",
            "deletedAt": null,
            "_id": "69794e670bf1ef02ca9fbc22",
            "createdAt": "2026-01-27T23:46:47.594Z",
            "updatedAt": "2026-01-27T23:46:47.594Z",
            "__v": 0
        }

2. Crear autores:

    POST http://localhost:3000/authors/

        {
            "firstName": "Bram",
            "lastName": "Stoker",
            "nationality": "Irish"
        }

    Retorna

        {
            "firstName": "Bram",
            "lastName": "Stoker",
            "nationality": "Irish",
            "deletedAt": null,
            "_id": "69794e6c0bf1ef02ca9fbc25",
            "createdAt": "2026-01-27T23:46:52.285Z",
            "updatedAt": "2026-01-27T23:46:52.285Z",
            "__v": 0
        }

3. Crear libros:

    POST http://localhost:3000/books/

        {
            "title": "Drácula",
            "author": "697837f3c387d54c8524bfef",
            "editorial": "Archibald Constable and Company",
            "quantityPages": 390,
            "measures": "13 x 19.5 cms",
            "price": 15.99,
            "stock": 17,
            "tags": ["6978377a4c538d90c2868281"],
            "imageString": "https://upload.wikimedia.org/wikipedia/commons/4/45/Dracula_1st_ed_cover_reproduction.jpg"
        }

    Retorna

        {
            "title": "El Huésped de Drácula",
            "author": "69794e6c0bf1ef02ca9fbc25",
            "editorial": "Plutón Ediciones",
            "quantityPages": 320,
            "measures": "15 x 23 cms",
            "price": 7.99,
            "stock": 12,
            "tags": [
                "69794e670bf1ef02ca9fbc22"
            ],
            "imageString": "https://images.cdn1.buscalibre.com/fit-in/360x360/58/a1/58a132378641ae42507fa2f214aac995.jpg",
            "isActive": true,
            "deletedAt": null,
            "_id": "697950b30bf1ef02ca9fbc3b",
            "createdAt": "2026-01-27T23:56:35.151Z",
            "updatedAt": "2026-01-27T23:56:35.151Z",
            "__v": 0
        }

4. Crear cupón:

    POST http://localhost:3000/coupons

        {    
            "code":"50OFF",
            "discountType":"PERCENTAGE",
            "discountValue":"50",
            "maxUses":"3",
            "expiresAt":"2026-05-20T15:30:00.000Z"
        }

    Retorna

        {
            "code": "50OFF",
            "discountType": "PERCENTAGE",
            "discountValue": 50,
            "maxUses": 3,
            "usedCount": 0,
            "expiresAt": "2026-05-20T15:30:00.000Z",
            "isActive": true,
            "deletedAt": null,
            "_id": "69794ee40bf1ef02ca9fbc2c",
            "createdAt": "2026-01-27T23:48:52.987Z",
            "updatedAt": "2026-01-27T23:48:52.987Z",
            "__v": 0
        }