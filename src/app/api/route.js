import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/dbConnection";
import Institution from "@/models/institution";

export async function GET() {
    await connectToMongoDB();
    const institution = await Institution.findOne({});
    if (!institution) {
        // return a null response if the institution is not found
        return new NextResponse("No institution found", { status: 404 });
    }
    // return the institution object if it is found
    return new NextResponse(JSON.stringify(institution), { status: 200 });
}

export async function POST(request) {
    await connectToMongoDB(); // Ensure the database connection is established

    try {
        const data = await request.json(); // Parse the request body
        const institution = new Institution(data); // Create a new instance of Institution

        const savedInstitution = await institution.save(); // Asynchronously save the new institution

        // After saving, return the saved institution and a 201 status code (indicates successful creation)
        return new NextResponse(JSON.stringify(savedInstitution), { status: 201, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error(error); // Log the error for server-side debugging

        // If it's a validation error or any other known error, you might want to return that specific error message
        // Otherwise, return a generic server error message
        const statusCode = error.name === 'ValidationError' ? 400 : 500;
        const message = statusCode === 400 ? error.message : "Internal Server Error";

        return new NextResponse(JSON.stringify({ message }), { status: statusCode, headers: { 'Content-Type': 'application/json' } });
    }
}

export async function PATCH(request) {
    await connectToMongoDB(); // Ensure the database connection is established

    try {
        const data = await request.json(); // Parse the request body
        const institutionId = request.nextUrl.searchParams.get('id'); // Or extract ID from the URL in another way depending on your routing

        if (!institutionId) {
            throw new Error("Institution ID is required for updating.");
        }

        const institution = await Institution.findByIdAndUpdate(institutionId, data, { new: true, runValidators: true });

        if (!institution) {
            return new NextResponse("Institution not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(institution), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error(error);
        const statusCode = error.name === 'ValidationError' ? 400 : 500;
        const message = statusCode === 400 ? error.message : "Internal Server Error";
        return new NextResponse(JSON.stringify({ message }), { status: statusCode, headers: { 'Content-Type': 'application/json' } });
    }
}

export async function DELETE(request) {
    await connectToMongoDB(); // Ensure the database connection is established

    try {
        const institutionId = request.nextUrl.searchParams.get('id'); // Or extract ID from the URL in another way depending on your routing

        if (!institutionId) {
            throw new Error("Institution ID is required for deletion.");
        }

        const deletedInstitution = await Institution.findByIdAndDelete(institutionId);

        if (!deletedInstitution) {
            throw new Error("Unable to delete institution.");
        }
    
        return new NextResponse("Institution deleted successfully!");

    } catch (error) {
        console.error("Deletion Error:", error); // Log the specific error
        return new NextResponse(JSON.stringify({ message: "Internal Server Error", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
