/*
campos: 
name
email
password
phone
direction
charge
contratation_date
salary
DUI
*/

import {Schema, model} from "mongoose";

const employeeSchema = new Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        phone: {
            type: String
        },
        direction: {
            type: String
        },
        charge: {
            type: String
        },
        contratation: {
            type: Date
        },
        salary: {
            type: Number
        },
        DUI: {
            type: String
        },
        isVerified: {
          type: Boolean,
        },
    },{
        timestamps: true,
        strict: false
    }
)

export default model("employee", employeeSchema)