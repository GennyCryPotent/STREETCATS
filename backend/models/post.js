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
            type: DataTypes.TEXT, // long text
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // name of the model it references
                key: 'id' // PK of the User model
            }
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true // optional field, can be null
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        image: {
            type: DataTypes.STRING, 
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