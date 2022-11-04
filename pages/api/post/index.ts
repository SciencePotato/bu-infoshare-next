// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firebaseConfig } from '../../../utils'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, child } from 'firebase/database';

type Data = {
  name: string
}
const updateFirebase:any = async () => {
  const app = initializeApp(firebaseConfig)
  const database = getDatabase(app);
  set(ref(database, 'maxPost'), {
    num: Math.random() * 100
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
      let update = await updateFirebase();
      update.then(() => 
        res.status(201).json(req.body)
      )
    }
}
