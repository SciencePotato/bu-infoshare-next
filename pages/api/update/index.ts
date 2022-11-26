import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseConfig } from '../../../utils'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, child, update } from 'firebase/database';

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
    
    await update((ref(database, `${body.path}`)), {
      votes: body.votes,
      upvoters: body.upvoters,
      downvoters: body.downvoters
    })

    let newData: any = null
    await get(child(ref(database), body.path)).then((snapshot) => {
      newData = snapshot.val();
    })

    // Fetch the new one so we can rerender.

    res.status(201).json(newData)
}
