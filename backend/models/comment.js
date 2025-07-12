import { DataTypes } from 'sequelize';

export function createModel(database){
    database.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        text: {
            type: DataTypes.TEXT, // testo lungo
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User', // Nome del modello a cui fa riferimento
                key: 'id' // Chiave primaria del modello User
            }
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Post', // Nome del modello a cui fa riferimento
                key: 'id' // Chiave primaria del modello Post
            }
        },
    });
}