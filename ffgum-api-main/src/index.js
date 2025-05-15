const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const promoCodeRoutes = require('./routes/promoCodeRoutes');
const withdrawalRoutes = require('./routes/withdrawalRoutes');
const socialSurveyRoutes = require("./routes/socialSurveyRoutes");
const sequelize = require('./handlers/dbHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/promocodes', promoCodeRoutes);
app.use('/api/withdrawals', withdrawalRoutes);
app.use('/api/surveys/social', socialSurveyRoutes);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});
