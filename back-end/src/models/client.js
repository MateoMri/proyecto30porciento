/*
campos:
name
email
password
phone
direction
DUI
*/

import { Schema, model } from "mongoose";

const clientSchema = new Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        password : {
            type: String
        },
        phone: {
            type: String
        },
        direction: {
            type: String
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

export default model("client", clientSchema)