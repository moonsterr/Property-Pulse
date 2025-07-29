import connectDB from '@/config/database';
import Property from '@/models/Property';
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const resolvedParams = await params;

    const userId = resolvedParams.userId;
    if (!userId) return new Response('User id is required', { status: 400 });

    const properties = await Property.find({ owner: userId });
    return new Response(JSON.stringify({ data: properties }), {
      status: 200,
    });
  } catch (error) {
    console.log(error.message);
    return new Response('Something went wrong', { status: 404 });
  }
};
