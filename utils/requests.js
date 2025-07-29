const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/properties`);
    if (!res.ok) {
      throw new Error('failed to fetch data');
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

//Fetch single property
async function fetchProperty(id) {
  try {
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error('failed to fetch data');
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
