export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return new Response(null, { status: 400 })
    }

    // Log the email open event
    // In a real app, you would store this in your database
    console.log(`Email opened: ${id} at ${new Date().toISOString()}`)

    // Create a 1x1 transparent pixel
    const pixel = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64")

    // Return the pixel with appropriate headers
    return new Response(pixel, {
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("Error tracking email:", error)
    return new Response(null, { status: 500 })
  }
}
