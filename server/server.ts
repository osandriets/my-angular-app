
import * as express from 'express';
import {Application} from "express";
import {getAllCourses} from "./get-courses.route";
import {saveCourse} from './save-course.route';
import {createCourse} from "./create-course.route";
import {deleteCourse} from "./delete-course.route";

const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

const cors = require('cors');

app.use(cors({origin: true}));

app.route('/api/heroes').get(getAllCourses);

app.route('/api/heroes').post(createCourse);

app.route('/api/heroes/:id').put(saveCourse);

app.route('/api/heroes/:id').delete(deleteCourse);

const httpServer = app.listen(9000, () => {
  console.log("HTTP REST API Server running at http://localhost:" + httpServer.address()["port"]);
});
