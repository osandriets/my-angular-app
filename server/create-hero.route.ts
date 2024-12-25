import {Request, Response} from 'express';
import {HEROES} from "./wikipedia_marvel_data";

export function createHero(req: Request, res: Response) {

  console.log("Creating new hero ...");

  const changes = req.body;

  const newHero = {
    ...changes
  };

  HEROES.pop(newHero);

  setTimeout(() => {

    res.status(200).json(newHero);

  }, 1500);

}
