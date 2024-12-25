import {Request, Response} from 'express';
import {COURSES} from "./wikipedia_marvel_data";



export function getAllCourses(req: Request, res: Response) {

  /*
      console.log("ERROR loading courses!");
      res.status(500).json({message: 'error occurred.'});
      return;
  */

 console.log(`Called GET /api/courses`);

  setTimeout(() => {

    console.log(`Returning GET /api/courses`);

    res.status(200).json({courses:COURSES});

  }, 1000);

}
