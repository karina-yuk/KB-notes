const fs = require("fs");
const { v4: uuid } = require("uuid");
const apiRoutes = require("express").Router();

// GET request to fetch all notes
apiRoutes.get("/notes", (req, res) => {
  fs.readFile("db/db.json", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST request to create a new note
apiRoutes.post("/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(), // Generate a unique ID for the new note using UUID
    };
    fs.readFile("./db/db.json", (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      let notes = JSON.parse(data);
      notes.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal Server Error" });
        }
        res.json(newNote);
      });
    });
  }
});

// DELETE request to remove a specific note by ID
apiRoutes.delete("/notes/:id", (req, res) => {
  console.log(req.params.id);
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    let notes = JSON.parse(data);
    const filteredNotes = notes.filter((note) => note.id !== req.params.id);
    console.log(filteredNotes);
    fs.writeFile("./db/db.json", JSON.stringify(filteredNotes), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res.json(filteredNotes);
    });
  });
});

module.exports = apiRoutes;
