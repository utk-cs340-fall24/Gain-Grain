export default function FindUser() {    
    app.post("/find-user", async (req, res) => {
        const { username, password } = req.body;

        try {
            const userFound = await findUser(username, password);

            if(userFound.success) {
                return res.status(200).json(userFound);
            } else {
                return res.status(401).json(userFound);
            }
        } catch(err) {
            console.log("Server error: ", err);
            return res.status(500).json({ success: false, message: "Server error."});
        }
    });
}