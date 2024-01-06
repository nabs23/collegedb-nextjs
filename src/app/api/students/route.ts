import Student from "@/models/student";
import connectToMongoDB from "@/utils/dbConnection";
import formatErrors from "@/utils/formatErrors";
import { NextResponse } from "next/server";
export async function GET() {
    await connectToMongoDB();
    const students = await Student.find({});
    return new NextResponse(JSON.stringify(students), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

export async function POST(request: Request) {
    await connectToMongoDB();
    const data = await request.json();
    const student = new Student(data);
    try {

    } catch (error: any) {
        return new NextResponse(JSON.stringify({ errors: formatErrors(error), message: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
    const savedStudent = await student.save();
    return new NextResponse(JSON.stringify(savedStudent), { status: 201, headers: { 'Content-Type': 'application/json' } });
}