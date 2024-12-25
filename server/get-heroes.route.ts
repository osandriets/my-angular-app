import {Request, Response} from 'express';
import {HEROES} from "./wikipedia_marvel_data";

export function getAllHeroes(req: Request, res: Response) {

 console.log(`Called GET /api/heroes`);

  setTimeout(() => {

    console.log(`Returning GET /api/heroes`);

    res.status(200).json(HEROES);

  }, 1000);

}
