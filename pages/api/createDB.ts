// pages/api/createDB.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_KEY });
const pageId = process.env.NOTION_PAGE_ID as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Extract dbTitle from the request body
            const { title: dbTitle } = req.body;

            // Ensure dbTitle is not empty
            if (!dbTitle) {
                return res.status(400).json({ message: "dbTitle is required" });
            }

            const newDb = await notion.databases.create({
                parent: {
                    type: "page_id",
                    page_id: pageId,
                },
                title: [
                    {
                        type: "text",
                        text: {
                            content: dbTitle,
                        },
                    },
                ],
                properties: {
                    Name: {
                        title: {},
                    },
                },
            });

            console.log(newDb); // It's generally a good practice to limit logging of potentially sensitive information in production
            res.status(200).json({ message: "success!", data: newDb });
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
