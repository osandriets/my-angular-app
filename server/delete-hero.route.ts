
import {Request, Response} from 'express';
import {HEROES} from "./wikipedia_marvel_data";

export function deleteHero(req: Request, res: Response) {

  console.log("Deleting hero ...");

  const id = req.params["id"];

  const hero = HEROES.find((h: any) => h.heroesLabel === id);

  delete HEROES[hero];

  setTimeout(() => {

    res.status(200).json({heroesLabel: id});

  }, 1500);

}

