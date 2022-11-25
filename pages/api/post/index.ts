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

    const size = data.posts.length
    
    await set(ref(database, `${body.path}/posts/${size}`), {
      comment: [],
      upvoters: {"rand":false},
      downvoters: {"rand":false},
      content: body.content,
      op: body.user,
      votes: body.votes,
      title: body.title,
    })

    let newData: any = null
    await get(child(ref(database), body.path)).then((snapshot) => {
      newData = snapshot.val();
    })

    // Fetch the new one so we can rerender.

    res.status(201).json(newData)
}
