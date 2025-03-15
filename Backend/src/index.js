import {app} from "./app.js";

const port = 7000
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

app.get("/test", (req, res) => {
    res.send("Welcome to MatterAssist");
  });