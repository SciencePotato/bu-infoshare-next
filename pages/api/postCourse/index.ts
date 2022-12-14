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

    await set(ref(database, `${body.path}/courses/${body.courseID}`), {
      posts: [],
      courseName: body.courseName,
    })

    let newData: any = null
    await get(child(ref(database), body.path)).then((snapshot) => {
      newData = snapshot.val();
    })

    res.status(201).json(newData)
}