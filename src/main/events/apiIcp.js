/* // Function to start the server
function startServer() {
  const express = require('express');
  const app = express();
  // Set up the server
  const port = 3000;
  const hostname = 'localhost';
  // Start the server
  app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  });
  }
  // Function to stop the server
  function stopServer() {
  const express = require('express');
  const app = express();
  // Stop the server
  app.server.close((err) => {
  if (err) {
  console.error(err);
  } else {
  console.log('Server stopped');
  }
  });
  }
  // Example usage:
  startServer();
  // ...
  stopServer();
 */
