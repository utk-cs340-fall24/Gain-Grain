import { NextResponse } from 'next/server';
import path from "path";
import fs from "fs";

const UPLOAD_DIR = "src/public/uploads";

export async function POST(req) {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const file = body.profilePic;

    const buffer = Buffer.from(await file.arrayBuffer());
    if(!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
    }

    fs.writeFileSync(
        path.resolve(UPLOAD_DIR, file.name),
        buffer
    );

    return NextResponse.json({ success: true, fileName: file.name });
}

export async function GET() {
    return NextResponse.json({ success: false, message: 'Method GET not allowed' }, { status: 405 });
}