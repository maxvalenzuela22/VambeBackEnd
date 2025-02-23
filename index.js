require('dotenv').config();
const express = require('express');
const db = require('./models');
const csvRoutes = require('./routes/csvRoutes');
const informationRoutes = require('./routes/informationRoutes')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/csv', csvRoutes);
app.use('/information', informationRoutes)

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  }).catch((err) => {
    console.log(err);
  });
