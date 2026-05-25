//Imports, packages that will be used
const express = require('express');
const cors = require('cors');
const applicationRoutes = require('./routes/applications');

//defines the app as an express instance
const app = express();
const PORT = process.env.PORT || 5000; //checks if port was defined, if not, falls back to 5000

//middleware - allows CORS on all requests and converst request to JS object
app.use(cors());
app.use(express.json());

//Any incoming request with this URL gets passed to applicationRoutes file to handle
app.use('/api/applications', applicationRoutes);

//listens on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

module.exports = app;