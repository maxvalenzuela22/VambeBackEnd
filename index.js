require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const csvRoutes = require('./routes/csvRoutes');
const informationRoutes = require('./routes/informationRoutes')
const statisticsRoutes = require('./routes/statisticsRoutes')

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/csv', csvRoutes);
app.use('/information', informationRoutes)
app.use('/statistics', statisticsRoutes)

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  }).catch((err) => {
    console.log(err);
  });
  