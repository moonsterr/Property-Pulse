const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties(page, size) {
  try {
    if (!apiDomain) {
      return { properties: [], total: 0 };
    }
    const res = await fetch(
      `${apiDomain}/properties?page=${page && page > 0 ? page : 1}&size=${
        size ? size : '99'
      }`
    );
    if (!res.ok) {
      throw new Error('failed to fetch data');
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return { properties: [], total: 0 }; // Fallback shape
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
