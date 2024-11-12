import Student from "@/models/student";
import connectToMongoDB from "@/utils/dbConnection";
import formatErrors from "@/utils/formatErrors";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
    await connectToMongoDB();
    const searchParams = request.nextUrl.searchParams;
    // Pagination parameters
    const page = parseInt(searchParams.get('page') as string) || 1;
    const limit = parseInt(searchParams.get('limit') as string) || 10;
    const skipIndex = (page - 1) * limit;
    const students = await Student.find({})
                        .limit(limit)
                        .skip(skipIndex);
    // Optionally, you might want to return the total count of documents for frontend pagination controls
    const total = await Student.countDocuments();
    return new NextResponse(JSON.stringify({students, total, totalPages: Math.ceil(total / limit)}), { status: 200, headers: { 'Content-Type': 'application/json' } });
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