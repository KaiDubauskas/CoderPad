// pages/api/createDB.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_KEY });
const pageId = process.env.NOTION_PAGE_ID as string;
const url = process.env.NEXT_URL as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PATCH') {
        try {
            // const blockId = '2159e6a2d21d4d68913ced6afe9aa1bb';
            const { code: code, blockId: blockId } = req.body;

            console.log("LAKsndf", code);
            console.log("JKSNDFKJNDJKFN", blockId)

            const response = await notion.blocks.update({
                block_id: blockId,
                "embed": {
                    url: `${url}?blockId=${blockId}&code=${code}`,
                }
            });
            // return res.status(200).json({ message: "success", blockId: response.results[0].id });
            console.log(
                "response", response
            )
        } catch (error) {
            console.error(error); // Log the error
            res.status(500).json({ message: "error", error });
        }
    } else {
        // Handle any non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
