import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { firebaseUpload } from '@/utils/firebaseUpload';

//GET apo/props
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const resolvedParams = await params;
    const property = await Property.findById(resolvedParams.id);
    if (!property) {
      return new Response(JSON.stringify({ data: 'no' }), { status: '500' });
    }
    return new Response(JSON.stringify({ data: property }), {
      status: 200,
    });
  } catch (error) {
    console.log(error.message);
    return new Response('Something went wrong', { status: 404 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const resolvedParams = await params;
    const propertyId = resolvedParams.id;

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User id is required', { status: 401 });
    }

    const { userId } = sessionUser;
    await connectDB();
    const property = await Property.findById(propertyId);
    if (!property) {
      return new Response(JSON.stringify({ data: 'no' }), { status: '500' });
    }

    if (property.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    await property.deleteOne();

    return new Response(JSON.stringify({ data: 'deleted' }), {
      status: 200,
    });
  } catch (error) {
    console.log(error.message);
    return new Response(`something went wrong ${error}`, { status: 404 });
  }
};
export const PUT = async (req, { params }) => {
  try {
    await connectDB();
    const resolvedParams = await params;

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User id is required', { status: 401 });
    }
    const { id } = resolvedParams;
    const { userId } = sessionUser;
    const formData = await req.formData();
    const amenities = formData.getAll('amenities');
    const existingProperty = await Property.findById(id);
    if (!existingProperty) {
      return new Response('Property doesnt exist', { status: 401 });
    }

    if (existingProperty.owner.toString() !== userId) {
      return new Response('unauthorized', { status: 401 });
    }
    console.log('These are the amenities', amenities);
    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
    };

    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${updatedProperty._id}`
    );
  } catch (error) {
    return new Response(`Failled to add property ${error}`, { status: 500 });
  }
};
