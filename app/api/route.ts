import clientPromise from "@/utils/mongodb"
import { NextApiRequest, NextApiResponse } from "next";
export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const users = await db.collection("users").find({}).toArray();
        return Response.json(users);
    } catch (e) {
        console.error(e);
    }
}

export async function POST(req: Request) {
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const data = await req.json();
        const name = data.name;
        const age = data.age;
        const email = data.email;
        await db.collection("users").insertOne({
            name: name,
            age: age,
            email: email,
        });
        return Response.json({
            "Status": "Entered data successfully"
        })
    } catch (e) {
        console.error(e);
    }
}

export async function DELETE(req: Request) {
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const data = await req.json();
        await db.collection("users").deleteMany({
            name: data.name
        });

        return Response.json({
            "status":"Deleted data successfully"
        });
    } catch (e) {
        console.error(e);
        return Response.json({
            "status": "Error occured"
        });
    }
}