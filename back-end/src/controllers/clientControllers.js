//array metodo crud
const clientController = {};
import clientModel from "../models/client.js";

//select
clientController.getclient = async (req, res) => {
    const client = await clientModel.find();
    res.json(client);
};

//insert
clientController.createclient = async (req, res) => {
    const {name, email, password, phone, direction, DUI} = req.body;
    const newclient = new clientModel({name, email, password, phone, direction, DUI});
    await newclient.save();
    res.json({ message: "client save"});
};

//delete
clientController.deleteclient = async (req, res) => {
    const deleteclient = await clientModel.findByIdAndDelete(req.params.id);
    if (!deleteclient) {
        return res.status(404).json({message: "didnt find that client"});

    }
    res.json({ message: "client deleted"});
};

//update
clientController.updateclient = async (req, res) => {
    //solicitar todos los valores
    const {name, email, password, phone, direction, DUI} = req.body;
    //actualizo
    await clientModel.findByIdAndUpdate(
        req.params.id,
        {
            name,
            email,
            password,
            phone,
            direction,
            DUI
        },
        {new: true}
    );
    res.json({message: "the client was updated"});

};

export default clientController;
