// pages/api/createDB.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_KEY });
const pageId = process.env.NOTION_PAGE_ID as string;



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const blockId = '2159e6a2d21d4d68913ced6afe9aa1bb';

            const response = await notion.blocks.children.append({
                block_id: blockId,
                children: [
                    {
                        "code": {
                            "language": "javascript",
                            "rich_text": [
                                {
                                    "type": "text",
                                    "text": {
                                        "content": "console.log('Hello, world!');"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "embed": {
                            url: "https://editcode.vercel.app/",
                            "caption": [
                                {
                                    "type": "text",
                                    "text": {
                                        "content": "Num1"
                                    }
                                },
                                {
                                    annotations: {
                                        code: true
                                    },
                                    "type": "text",
                                    "text": {
                                        "content": "num2"
                                    }
                                }
                            ]
                        }
                    },
                ],
            });

            console.log(response);

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
