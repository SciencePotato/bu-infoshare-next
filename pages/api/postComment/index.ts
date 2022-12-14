import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseConfig } from '../../../utils'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, child } from 'firebase/database';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { body } = req

    const app = initializeApp(firebaseConfig)
    const database = getDatabase(app);
    let data: any = null

    await get(child(ref(database), body.path)).then((snapshot) => {
      data = snapshot.val();
    })

    const size = (data === null)? 1: data.length  
    await set(ref(database, `${body.path}/${size}`), {
      content: body.content,
      user: body.user,
      votes: body.votes,
      upvoters: {"rand":false},
      downvoters: {"rand":false} 
    })

    let newData: any = null
    await get(child(ref(database), body.path)).then((snapshot) => {
      newData = snapshot.val();
    })

    res.status(201).json(newData)
}