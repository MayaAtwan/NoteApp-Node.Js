//Yargs is a popular Node.js library that simplifies the process of parsing command-line arguments
// and building interactive command-line tools.
const yargs = require('yargs');

// is a common Node.js code that imports the built-in 'fs' module. 'fs' stands for File System, 
//and it is a core module in Node.js that allows you to work with the file system on your computer.
const fs = require('fs'); // Import the built-in 'fs' module for file operations

// Add the 'remove' command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Title of the note to be removed',
      demandOption: true, // Title is required
      type: 'string'      // Title should be a string
    }
  },
  handler: function (argv) {
    // Read existing notes data from the file, if available
    let notes = [];
    try {
      const dataBuffer = fs.readFileSync('./data');
      // Convert JSON string into an object
      notes = JSON.parse(dataBuffer.toString());
    } catch (error) {
      // If the file doesn't exist or there's an error reading it, that's okay.
      // We'll create a new file and notes array.
    }

    // Find the index of the note with the specified title
    const noteIndex = notes.findIndex(note => note.title === argv.title);

    if (noteIndex !== -1) {
      // Note found, remove it from the notes array
      notes.splice(noteIndex, 1);

      // Save the updated notes array to the file
      // Convert JavaScript object into JSON string
      fs.writeFileSync('./data', JSON.stringify(notes));

      console.log(`Note with title "${argv.title}" has been removed.`);
    } else {
      console.log(`Note with title "${argv.title}" not found.`);
    }
  }
});

// Add the 'add' command with options for 'title' and 'body'
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true, // Title is required
        type: 'string'      // Title should be a string
      },
      body: {
        describe: 'Note body',
        demandOption: true, // Body is required
        type: 'string'      // Body should be a string
      }
    },
    handler: function (argv) {
      // Read existing notes data from the file, if available
      let notes = [];
      try {
        const dataBuffer = fs.readFileSync('./data');
        // Covert JSON string into object
        notes = JSON.parse(dataBuffer.toString());
      } catch (error) {
        // If the file doesn't exist or there's an error reading it, that's okay.
        // We'll create a new file and notes array.
      }
  
      // Create a new note object and add it to the notes array
      const newNote = {
        title: argv.title,
        body: argv.body
      };
      notes.push(newNote);
  
      // Save the updated notes array to the file
      // Covert JavaScript object into JSON string
      fs.writeFileSync('./data', JSON.stringify(notes));
  
      console.log('Adding a new note!');
    }
  });

// Parse the command-line arguments
yargs.parse();


