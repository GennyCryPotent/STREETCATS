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
                model: 'Users', 
                key: 'id' 
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
                model: 'Posts', 
                key: 'id' 
            }
        },
    });
}