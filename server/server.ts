
import * as express from 'express';
import {Application} from "express";
import {getAllHeroes} from "./get-heroes.route";
import {saveHero} from './save-hero.route';
import {createHero} from "./create-hero.route";
import {deleteHero} from "./delete-hero.route";

const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

const cors = require('cors');

app.use(cors({origin: true}));

app.route('/api/heroes').get(getAllHeroes);

app.route('/api/heroes').post(createHero);

app.route('/api/heroes/:id').put(saveHero);

app.route('/api/heroes/:id').delete(deleteHero);

const httpServer = app.listen(9000, () => {
  console.log("HTTP REST API Server running at http://localhost:" + httpServer.address()["port"]);
});
