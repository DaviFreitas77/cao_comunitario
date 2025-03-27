const express = require('express');

require('./database');
const app = express();
app.use(express.json()); // usar o tipo de estrutura JSON
const userRoute = require('./routes/user')
const petRoute = require('./routes/pet')
const typePet = require('./routes/typePet')
const age = require('./routes/agePet')
const genderPet = require('./routes/genderPet')

app.use('/api', userRoute); 
app.use('/api', petRoute);
app.use('/api/',typePet)
app.use('/api/',age)
app.use('/api/',genderPet)
app.listen(3000);