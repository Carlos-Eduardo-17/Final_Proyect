1. Eliminar Tag:

    DELETE http://localhost:3000/tags/697a2f04b2e6b10a90366634

    Retorna

        {
            "_id": "697a2f04b2e6b10a90366634",
            "name": "historico",
            "deletedAt": "2026-01-28T15:45:26.244Z",
            "createdAt": "2026-01-28T15:45:08.924Z",
            "updatedAt": "2026-01-28T15:45:26.245Z",
            "__v": 0
        }

2. Eliminar Autor:

    DELETE http://localhost:3000/authors/697a2fa2b2e6b10a90366639

    Retorna

        {
            "_id": "697a2fa2b2e6b10a90366639",
            "firstName": "César",
            "lastName": "Vallejo",
            "nationality": "Peruvian",
            "deletedAt": "2026-01-28T15:47:57.781Z",
            "createdAt": "2026-01-28T15:47:46.803Z",
            "updatedAt": "2026-01-28T15:47:57.781Z",
            "__v": 0
        }

3. Eliminar Libro:

    DELETE http://localhost:3000/books/697a2fe1b2e6b10a9036663f

    Retorna

        {
            "_id": "697a2fe1b2e6b10a9036663f",
            "title": "La esposa de Drácula",
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
            "deletedAt": "2026-01-28T15:49:06.214Z",
            "createdAt": "2026-01-28T15:48:49.277Z",
            "updatedAt": "2026-01-28T15:49:06.214Z",
            "__v": 0
        }

4. Eliminar Cupón:

    DELETE http://localhost:3000/coupons/697a302eb2e6b10a90366646

    Retorna

        {
            "_id": "697a302eb2e6b10a90366646",
            "code": "90OFF",
            "discountType": "PERCENTAGE",
            "discountValue": 90,
            "maxUses": 11,
            "usedCount": 0,
            "expiresAt": "2026-05-20T15:30:00.000Z",
            "isActive": true,
            "deletedAt": "2026-01-28T15:50:18.524Z",
            "createdAt": "2026-01-28T15:50:06.482Z",
            "updatedAt": "2026-01-28T15:50:18.524Z",
            "__v": 0
        }

5. Eliminar Item de Carrito:

    DELETE 