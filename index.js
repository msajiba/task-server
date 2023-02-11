require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('server check');
});


app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
});