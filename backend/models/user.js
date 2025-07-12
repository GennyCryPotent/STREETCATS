import { DataTypes } from 'sequelize';

export function createModel(database){
    database.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,      
            allowNull: false
        },
        age: DataTypes.INTEGER,
        password: DataTypes.STRING
    });

}