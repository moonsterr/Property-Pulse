import connectDB from '@/config/database';
import Property from '@/models/Property';

//get api/prwqdwqdwqdqwd
export const GET = async (req) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const location = searchParams.get('location');
    const type = searchParams.get('type');
    const locationPattern = new RegExp(location, 'i');
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { 'location.street': locationPattern },
        { 'location.city': locationPattern },
        { 'location.state': locationPattern },
        { 'location.zipcode': locationPattern },
      ],
    };
    if (type && type !== 'all') {
      const typePattern = new RegExp(type, 'i');
      query.type = typePattern;
    }
    const properties = await Property.find(query);
    return new Response(JSON.stringify({ properties }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: 'failure' }), {
      status: 500,
    });
  }
};
