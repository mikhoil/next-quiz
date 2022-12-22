import { NextApiResponse, NextApiRequest } from 'next';
import connect2db from '../../lib/mongodb';

export default async function handler(
    req: NextApiRequest & { _id: number },
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const { _id } = req;
        const results = (
            await (await connect2db()).db
                .collection('tests')
                .find({ _id })
                .toArray()
        )[0].results;
        res.status(200).json({ results });
    }
}
