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

    const body = await request.json();
    
    // Create a new INSTITUTION instance with the body data
    const institution = new Institution(body);
  
    try {
  
      const savedInstiutution = await institution.save();
  
      return NextResponse.json(savedInstiutution, { status: 201 });
    } catch (error) {
      // Mongoose validation errors will be in error.errors
      const mongooseErrors = {};
      if (error.errors) {
        for (let key in error.errors) {
          mongooseErrors[key] = error.errors[key].message;
        }
      }
      return NextResponse.json({ errors: mongooseErrors });
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
      // Mongoose validation errors will be in error.errors
      const mongooseErrors = {};
      if (error.errors) {
        for (let key in error.errors) {
          mongooseErrors[key] = error.errors[key].message;
        }
      }
      return NextResponse.json({ errors: mongooseErrors });
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
