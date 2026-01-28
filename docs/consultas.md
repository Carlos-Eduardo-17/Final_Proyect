1. Obtener datos de la sesión actual:
    
    GET http://localhost:3000/auth/me

    Retorna

        {
            "_id": "69794b0b0bf1ef02ca9fbc1a",
            "firstName": "Luciana",
            "lastName": "Sanchez",
            "email": "gaviluz794@gmail.com",
            "role": {
                "_id": "6978f68511b710de0ecc4fda",
                "name": "USER",
                "createdAt": "2026-01-27T17:31:49.718Z",
                "updatedAt": "2026-01-27T17:31:49.718Z"
            },
            "status": "ACTIVE",
            "emailVerified": true,
            "verificationCode": null,
            "verificationCodeExpiresAt": null,
            "deletedAt": null,
            "createdAt": "2026-01-27T23:32:27.276Z",
            "updatedAt": "2026-01-27T23:33:22.392Z",
            "__v": 0
        }

2. Obtener Tags:

    GET http://localhost:3000/tags/

    Retorna

        [
            {
                "_id": "69794e670bf1ef02ca9fbc22",
                "name": "terror",
                "deletedAt": null,
                "createdAt": "2026-01-27T23:46:47.594Z",
                "updatedAt": "2026-01-27T23:46:47.594Z",
                "__v": 0
            }
        ]

3. Obtener detalles de un Tag:

    GET http://localhost:3000/tags/69794e670bf1ef02ca9fbc22

    Retorna

        {
            "_id": "69794e670bf1ef02ca9fbc22",
            "name": "terror",
            "deletedAt": null,
            "createdAt": "2026-01-27T23:46:47.594Z",
            "updatedAt": "2026-01-27T23:46:47.594Z",
            "__v": 0
        }

4. Obtener Autores:

    GET http://localhost:3000/authors/

    Retorna

        [
            {
                "_id": "69794e6c0bf1ef02ca9fbc25",
                "firstName": "Bram",
                "lastName": "Stoker",
                "nationality": "Irish",
                "deletedAt": null,
                "createdAt": "2026-01-27T23:46:52.285Z",
                "updatedAt": "2026-01-27T23:46:52.285Z",
                "__v": 0
            }
        ]

5.  Obtener detalles de un Autor:

    GET http://localhost:3000/authors/69794e6c0bf1ef02ca9fbc25

    Retorna

        {
            "_id": "69794e6c0bf1ef02ca9fbc25",
            "firstName": "Bram",
            "lastName": "Stoker",
            "nationality": "Irish",
            "deletedAt": null,
            "createdAt": "2026-01-27T23:46:52.285Z",
            "updatedAt": "2026-01-27T23:46:52.285Z",
            "__v": 0
        }

6. Obtener libros:

    GET http://localhost:3000/books/

    Retorna

        [
            {
                "_id": "69794e920bf1ef02ca9fbc29",
                "title": "Drácula",
                "author": {
                    "_id": "69794e6c0bf1ef02ca9fbc25",
                    "firstName": "Bram",
                    "lastName": "Stoker",
                    "nationality": "Irish",
                    "deletedAt": null,
                    "createdAt": "2026-01-27T23:46:52.285Z",
                    "updatedAt": "2026-01-27T23:46:52.285Z",
                    "__v": 0
                },
                "editorial": "Archibald Constable and Company",
                "quantityPages": 390,
                "measures": "13 x 19.5 cms",
                "price": 15.99,
                "stock": 17,
                "tags": [
                    {
                        "_id": "69794e670bf1ef02ca9fbc22",
                        "name": "terror",
                        "deletedAt": null,
                        "createdAt": "2026-01-27T23:46:47.594Z",
                        "updatedAt": "2026-01-27T23:46:47.594Z",
                        "__v": 0
                    }
                ],
                "imageString": "https://upload.wikimedia.org/wikipedia/commons/4/45/Dracula_1st_ed_cover_reproduction.jpg",
                "isActive": true,
                "deletedAt": null,
                "createdAt": "2026-01-27T23:47:30.290Z",
                "updatedAt": "2026-01-27T23:47:30.290Z",
                "__v": 0
            },
            {
                "_id": "697950b30bf1ef02ca9fbc3b",
                "title": "El Huésped de Drácula",
                "author": {
                    "_id": "69794e6c0bf1ef02ca9fbc25",
                    "firstName": "Bram",
                    "lastName": "Stoker",
                    "nationality": "Irish",
                    "deletedAt": null,
                    "createdAt": "2026-01-27T23:46:52.285Z",
                    "updatedAt": "2026-01-27T23:46:52.285Z",
                    "__v": 0
                },
                "editorial": "Plutón Ediciones",
                "quantityPages": 320,
                "measures": "15 x 23 cms",
                "price": 7.99,
                "stock": 12,
                "tags": [
                    {
                        "_id": "69794e670bf1ef02ca9fbc22",
                        "name": "terror",
                        "deletedAt": null,
                        "createdAt": "2026-01-27T23:46:47.594Z",
                        "updatedAt": "2026-01-27T23:46:47.594Z",
                        "__v": 0
                    }
                ],
                "imageString": "https://images.cdn1.buscalibre.com/fit-in/360x360/58/a1/58a132378641ae42507fa2f214aac995.jpg",
                "isActive": true,
                "deletedAt": null,
                "createdAt": "2026-01-27T23:56:35.151Z",
                "updatedAt": "2026-01-27T23:56:35.151Z",
                "__v": 0
            }
        ]

7. Obtener detalles de un libro:

    GET http://localhost:3000/books/697950b30bf1ef02ca9fbc3b

    Retorna

        {
            "_id": "697950b30bf1ef02ca9fbc3b",
            "title": "El Huésped de Drácula",
            "author": {
                "_id": "69794e6c0bf1ef02ca9fbc25",
                "firstName": "Bram",
                "lastName": "Stoker",
                "nationality": "Irish",
                "deletedAt": null,
                "createdAt": "2026-01-27T23:46:52.285Z",
                "updatedAt": "2026-01-27T23:46:52.285Z",
                "__v": 0
            },
            "editorial": "Plutón Ediciones",
            "quantityPages": 320,
            "measures": "15 x 23 cms",
            "price": 7.99,
            "stock": 12,
            "tags": [
                {
                    "_id": "69794e670bf1ef02ca9fbc22",
                    "name": "terror",
                    "deletedAt": null,
                    "createdAt": "2026-01-27T23:46:47.594Z",
                    "updatedAt": "2026-01-27T23:46:47.594Z",
                    "__v": 0
                }
            ],
            "imageString": "https://images.cdn1.buscalibre.com/fit-in/360x360/58/a1/58a132378641ae42507fa2f214aac995.jpg",
            "isActive": true,
            "deletedAt": null,
            "createdAt": "2026-01-27T23:56:35.151Z",
            "updatedAt": "2026-01-27T23:56:35.151Z",
            "__v": 0
        }

8. Obtener Órden de compra:

    GET http://localhost:3000/orders/

    Retorna

        [
            {
                "_id": "6979513f0bf1ef02ca9fbc4c",
                "user": "69794b0b0bf1ef02ca9fbc1a",
                "status": "PAID",
                "coupon": "69794ee40bf1ef02ca9fbc2c",
                "subtotal": 39.97,
                "discountTotal": 19.985,
                "total": 19.985,
                "createdAt": "2026-01-27T23:58:55.920Z",
                "updatedAt": "2026-01-28T00:11:08.913Z",
                "__v": 0
            }
        ]

9. Obtener detalle de la Órden de compra:

    GET http://localhost:3000/orders/6979513f0bf1ef02ca9fbc4c

    Retorna

        {
            "_id": "6979513f0bf1ef02ca9fbc4c",
            "user": {
                "_id": "69794b0b0bf1ef02ca9fbc1a",
                "firstName": "Luciana",
                "lastName": "Sanchez",
                "email": "gaviluz794@gmail.com"
            },
            "status": "PAID",
            "coupon": "69794ee40bf1ef02ca9fbc2c",
            "subtotal": 39.97,
            "discountTotal": 19.985,
            "total": 19.985,
            "createdAt": "2026-01-27T23:58:55.920Z",
            "updatedAt": "2026-01-28T00:11:08.913Z",
            "__v": 0
        }

10. Obtener lista de productos de la Órden de compra

    GET http://localhost:3000/orderDetails/6979513f0bf1ef02ca9fbc4c

    Retorna

        {
            "id": "6979513f0bf1ef02ca9fbc4c",
            "items": [
                {
                    "_id": "697951400bf1ef02ca9fbc50",
                    "order": "6979513f0bf1ef02ca9fbc4c",
                    "book": {
                        "_id": "69794e920bf1ef02ca9fbc29",
                        "title": "Drácula",
                        "author": "69794e6c0bf1ef02ca9fbc25",
                        "editorial": "Archibald Constable and Company",
                        "quantityPages": 390,
                        "measures": "13 x 19.5 cms",
                        "price": 15.99,
                        "stock": 17,
                        "tags": [
                            "69794e670bf1ef02ca9fbc22"
                        ],
                        "imageString": "https://upload.wikimedia.org/wikipedia/commons/4/45/Dracula_1st_ed_cover_reproduction.jpg",
                        "isActive": true,
                        "deletedAt": null,
                        "createdAt": "2026-01-27T23:47:30.290Z",
                        "updatedAt": "2026-01-27T23:47:30.290Z",
                        "__v": 0
                    },
                    "titleSnapshot": "Drácula",
                    "priceSnapshot": 15.99,
                    "quantity": 2,
                    "__v": 0,
                    "createdAt": "2026-01-27T23:58:56.213Z"
                },
                {
                    "_id": "697951400bf1ef02ca9fbc51",
                    "order": "6979513f0bf1ef02ca9fbc4c",
                    "book": {
                        "_id": "697950b30bf1ef02ca9fbc3b",
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
                        "createdAt": "2026-01-27T23:56:35.151Z",
                        "updatedAt": "2026-01-27T23:56:35.151Z",
                        "__v": 0
                    },
                    "titleSnapshot": "El Huésped de Drácula",
                    "priceSnapshot": 7.99,
                    "quantity": 1,
                    "__v": 0,
                    "createdAt": "2026-01-27T23:58:56.213Z"
                }
            ]
        }

11. Obtener detalles de un Cupón:

    GET http://localhost:3000/coupons/50OFF

    Retorna

        {
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
        }

12. Obtener detalle de carrito:

    GET http://localhost:3000/cart/

    Retorna

        {
            "_id": "69794f950bf1ef02ca9fbc34",
            "user": "69794b0b0bf1ef02ca9fbc1a",
            "status": "CONVERTED",
            "createdAt": "2026-01-27T23:51:49.962Z",
            "__v": 0
        }