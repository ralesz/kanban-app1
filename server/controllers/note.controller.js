import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid';

export function getSomething(req, res) {
  return res.status(200).end();
}

export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

export function deleteNote(req, res) {
  const { noteId, laneId } = req.body;

  if (!noteId || !laneId) {
    res.status(400).end();
  }

  Lane.findOne({ id: laneId })
    .then(lane => {
      lane.notes.findOne({ id: noteId })
        .then(note => {
          note.remove();
        });
    });
}

export function getNotes(req, res) {
  Note.find().exec((err, notes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ notes });
  });
}

export function editNote(req, res) {
  const noteId = req.body.id;
  const newTask = req.body.task;

  if (!noteId) {
    res.status(400).end();
  }

  Note.findOne({ id: noteId })
      .then(note => {
        note.task = newTask;
      });
}