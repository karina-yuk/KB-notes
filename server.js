const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

const htmlRoutes = require("./routes/htmlRoutes"); 
const apiRoutes = require("./routes/apiRoutes"); 

app.use(express.static("public"));
app.use(express.json());

app.use("/api", apiRoutes); 
app.use("/", htmlRoutes); 

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
