import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

const { AWS_KEY_ID, AWS_KEY_SECRET, AWS_DESTINATION_EMAIL, AWS_SOURCE_EMAIL } = process.env;

AWS.config.update({
    credentials: {
        accessKeyId: AWS_KEY_ID!,
        secretAccessKey: AWS_KEY_SECRET!,
    },
});

let ses = new AWS.SES();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        let data = req.body as { name: string; email: string; description: string };
        if (
            typeof data.name !== "string" ||
            typeof data.email !== "string" ||
            typeof data.description !== "string" ||
            data.name.length < 1 ||
            data.name.length > 150 ||
            data.email.length < 5 ||
            data.email.length > 150 ||
            data.description.length < 10 ||
            data.description.length > 30000
        ) {
            return res.status(406).end();
        }

        try {
            await ses
                .sendEmail({
                    Destination: {
                        ToAddresses: [AWS_DESTINATION_EMAIL!],
                    },
                    Message: {
                        Subject: {
                            Data: "Contact form submission",
                        },
                        Body: {
                            Text: {
                                Data: `From: ${data.name}\nE-mail: ${data.email}\n\n${data.description}`,
                            },
                        },
                    },
                    Source: AWS_SOURCE_EMAIL!,
                })
                .promise();
            console.log("submitted form", data.email);
            res.end();
        } catch (ex) {
            console.error("could not send e-mail", ex);
            res.status(500).end();
        }
    } else {
        return res.status(405).end();
    }
};
