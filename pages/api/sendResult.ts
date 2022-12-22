import type { NextApiResponse, NextApiRequest } from 'next';
import connect2db from '../../lib/mongodb';

interface ResquestData {
    _id: number;
    result: number;
}

export default async function handler(
    req: NextApiRequest & ResquestData,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { _id, result } = req;
        await (await connect2db()).db
            .collection('tests')
            .updateOne({ _id }, { $push: { results: result } });
        res.status(200);
    }
}
