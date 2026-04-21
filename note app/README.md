# Note App

A simple, dynamic Note Application built using React. 

## Features

- **Add Notes:** Type your note in the input field and press "Add" (or hit Enter) to save it.
- **Update Notes:** Edit existing notes easily using the "Update" button next to each note.
- **Delete Notes:** Remove unwanted notes from your list using the "Delete" button.
- **Clean UI:** Simple and straightforward design for easy readability.

## Technologies Used

- **HTML5 & Vanilla CSS**
- **JavaScript (ES6+)**
- **React (v18)** - loaded directly via CDN
- **Babel (Standalone)** - for compiling JSX directly in the browser without a build step

## How to Run

Because this app uses Babel standalone to compile the `note.js` file dynamically in the browser, opening the `index.html` file directly by double-clicking it (via the `file:///` protocol) might result in a blank screen. This is due to standard browser security (CORS) policies blocking the loading of local scripts.

To run this application correctly, you must serve it using a local web server:

### Option 1: Using Python (Recommended if you have Python installed)
1. Open your terminal or command prompt.
2. Navigate to this folder (`note app`).
3. Run the following command to start a simple HTTP server:
   ```bash
   python -m http.server 8080
   ```
4. Open your web browser and go to: [http://localhost:8080](http://localhost:8080)

### Option 2: Using Node.js
1. If you have Node.js installed, open your terminal in this folder.
2. Run the following command:
   ```bash
   npx http-server
   ```
3. Open the `localhost` URL provided in the terminal output in your browser.
