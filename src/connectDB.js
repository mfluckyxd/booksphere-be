const {connect} = require('mongoose');

connect(process.env.DB_URL)
.then(() => {
    console.log('Database connection successful');
})
.catch((err) => {
    console.log(`Error: ${err.message}`);
})