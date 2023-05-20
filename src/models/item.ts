import {Schema, Types, Model, model, version} from "mongoose"
import { Car } from "../interfaces/car.interface"

const ItemSchema = new Schema<Car>( 
    {

    },   
    {
        timestamps: true,
        versionKey: false,
    }
);