import { NextResponse } from "next/server";
import connectToMongoDB from "@/utils/dbConnection";
import formatErrors from "@/utils/formatErrors";
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

    const existingInstitution = await Institution.findOne();

    if (existingInstitution) {
      // If an institution already exists, return an error response
      return NextResponse.json(
        { error: 'An institution already exists. Only one is allowed.' },
        { status: 409 }
      );
    }

    const body = await request.json();
    const institution = new Institution(body);
    
    try {
      // Validates and saves the institution
      const savedInstiutution = await institution.save();
      return NextResponse.json(savedInstiutution, { status: 201 });  
    } catch (error) {
      return NextResponse(JSON.stringify({ errors: formatErrors(error), message: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }

export async function PUT(request) {
    await connectToMongoDB(); // Ensure the database connection is established

    try {
        const data = await request.json(); // Parse the request body

        const institution = await Institution.findByIdAndUpdate(data._id, data, { new: true, runValidators: true });

        if (!institution) {
            return new NextResponse("Institution not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(institution), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
      return NextResponse(JSON.stringify({ errors: formatErrors(error), message: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
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
    
        return new NextResponse(JSON.stringify({ message: "Institution deleted successfully!" }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error("Deletion Error:", error); // Log the specific error
        return new NextResponse(JSON.stringify({ message: "Internal Server Error", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
