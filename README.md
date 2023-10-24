# Node.js Note-Taking App

A minimalistic command-line note-taking application built with Node.js. This app allows you to add new notes and remove existing notes, all from your terminal.

## Features

- Add a new note
- Remove a note

##Usage:

1. to add a new note, use the following command:
   node app.js add --title="Your Note Title" --body="Your Note Content"

2. To remove a note, use the following command:
   node app.js remove --title="Note Title"

##Data Storage:

This app uses JSON files to store notes. Each note is stored as a separate JSON file in the data directory.
