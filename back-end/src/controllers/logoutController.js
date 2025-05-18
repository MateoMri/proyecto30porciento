const logoutController = {};

logoutController.logout = async (req, res) => {
    res.clearCookie("authToken");

    res.json({ message: "logged out successful"});
};

export default logoutController;