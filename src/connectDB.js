const {connect} = require('mongoose');

console.log("im here in connection")
connect(process.env.DB_URL)
.then(() => {
    console.log('Database connection successful');
})
.catch((err) => {
    console.log(`Error: ${err.message}`);
})
