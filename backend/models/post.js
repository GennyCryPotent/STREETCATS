import { DataTypes } from 'sequelize';

export function createModel(database){
    database.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
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
        gender: {
            type: DataTypes.STRING,
            allowNull: true // opzionale
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        image: {
            type: DataTypes.STRING, // URL o percorso relativo
            allowNull: false
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });
}