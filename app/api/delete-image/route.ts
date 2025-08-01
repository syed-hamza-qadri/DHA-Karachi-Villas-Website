import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

// Initialize Supabase client with service role key for elevated privileges
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json()

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    // Extract the file path from the full URL
    const url = new URL(imageUrl)
    const pathSegments = url.pathname.split("/")
    const bucketName = "property-images"
    const bucketIndex = pathSegments.indexOf(bucketName)

    if (bucketIndex === -1 || bucketIndex + 1 >= pathSegments.length) {
      return NextResponse.json(
        { error: "Invalid image URL format. Could not find bucket name in path." },
        { status: 400 },
      )
    }

    const filePath = pathSegments.slice(bucketIndex + 1).join("/")

    if (!filePath) {
      return NextResponse.json({ error: "Could not determine file path from URL" }, { status: 400 })
    }

    const { error } = await supabase.storage.from(bucketName).remove([filePath])

    if (error) {
      console.error("Supabase storage error:", error)
      return NextResponse.json({ error: `Failed to delete image: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "An internal server error occurred" }, { status: 500 })
  }
}
