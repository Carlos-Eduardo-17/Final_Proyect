1. Actualizar tag:

    PUT http://localhost:3000/tags/69794e670bf1ef02ca9fbc22

        {
            "name": "Drama"
        }
    
    Retorna

        {
            "_id": "69794e670bf1ef02ca9fbc22",
            "name": "drama",
            "deletedAt": null,
            "createdAt": "2026-01-27T23:46:47.594Z",
            "updatedAt": "2026-01-28T04:52:56.830Z",
            "__v": 0
        }

2. Actualizar Autor:

    PUT http://localhost:3000/authors/69794e6c0bf1ef02ca9fbc25

        {
            "firstName": "Abraham",
            "lastName": "Diaz",
            "nationality": "British"
        }
    
    Retorna

        {
            "_id": "69794e6c0bf1ef02ca9fbc25",
            "firstName": "Abraham",
            "lastName": "Diaz",
            "nationality": "British",
            "deletedAt": null,
            "createdAt": "2026-01-27T23:46:52.285Z",
            "updatedAt": "2026-01-28T04:55:30.405Z",
            "__v": 0
        }

3. Actualizar libro:

    PUT http://localhost:3000/books/69794e920bf1ef02ca9fbc29

        {
            "title": "El Conde Dracula",
            "author": "69794e6c0bf1ef02ca9fbc25",
            "editorial": "Plutón Ediciones",
            "quantityPages": 400,
            "measures": "13 x 20 cm",
            "price": 13.99,
            "stock": 12,
            "tags": ["69794e670bf1ef02ca9fbc22"],
            "imageString": "https://upload.wikimedia.org/wikipedia/commons/4/45/Dracula_1st_ed_cover_reproduction.jpg"
        }
    
    Retorna

        {
            "_id": "69794e920bf1ef02ca9fbc29",
            "title": "El Conde Dracula",
            "author": "69794e6c0bf1ef02ca9fbc25",
            "editorial": "Plutón Ediciones",
            "quantityPages": 400,
            "measures": "13 x 20 cm",
            "price": 13.99,
            "stock": 12,
            "tags": [
                "69794e670bf1ef02ca9fbc22"
            ],
            "imageString": "https://upload.wikimedia.org/wikipedia/commons/4/45/Dracula_1st_ed_cover_reproduction.jpg",
            "isActive": true,
            "deletedAt": null,
            "createdAt": "2026-01-27T23:47:30.290Z",
            "updatedAt": "2026-01-28T04:58:06.582Z",
            "__v": 0
        }