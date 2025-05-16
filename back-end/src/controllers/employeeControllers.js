//Array de motodo crud
const employeeController = {};
import employeeModel from "../models/employee.js";

//select
employeeController.gatemployee = async (req, res) => {
    const employee = await employeeModel.find();
    res.json(employee);
};

//insert
employeeController.createemployee = async (req, res) => {
    const {name, email, password, phone, direction, charge, contrataion, salary, DUI} = req.body;
    const newemployee = new employeeModel({ name, email, password, phone, direction, charge, contrataion, salary, DUI});
    await newemployee.save();
    res.json({ message: "employee save" })
};

//delete
employeeController.deleteemployee = async (req, res) => {
    const deleteemployee = await employeeModel.findByIdAndDelete(req.params.id);
    if (!deleteemployee) {
        return res.status(404).json({ message: "no employee found" });

    }
    res.json({ message: "employee deleted" });
};

//update
employeeController.updateemployee = async (req, res) => {
    //solicitar todos los valores
    const {name, email, password, phone, direction, charge, contrataion, salary, DUI} = req.body;
    //actualizo
    await employeeModel.findByIdAndUpdate(
        req.params.id,
        {
            name,
            email,
            password,
            phone,
            direction,
            charge,
            contrataion,
            salary,
            DUI
        },
        { new: true }
    );
    //mensaje
    res.json({ message: "employee updated"});
};

export default employeeController;