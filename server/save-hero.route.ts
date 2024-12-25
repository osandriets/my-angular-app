import {Request, Response} from 'express';
import {HEROES} from "./wikipedia_marvel_data";
import {setTimeout} from 'timers';


export function saveHero(req: Request, res: Response) {

  /*
    console.log("ERROR saving hero!");
    res.sendStatus(500);
    return;
  */


  const id = req.params["id"],
    changes = req.body;

  console.log("Saving hero changes", id, JSON.stringify(changes));

  const newHero = {
    ...HEROES[id],
    ...changes
  };

  HEROES[id] = newHero;

  console.log("new hero version", newHero);

  setTimeout(() => {

    res.status(200).json(HEROES[id]);

  }, 1500);



}
