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
    const app = initializeApp(firebaseConfig)
    const database = getDatabase(app);
    let data: any = null
    await get(child(ref(database), 'maxPost')).then((snapshot) => {
      data = snapshot.val();
    })

    await set(ref(database, 'maxPost'), {
      num: parseInt(data["num"]) + 1
    })

    res.status(201).json(req.body)
}
