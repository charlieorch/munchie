// use ths link to access demo for API request: https://cors-anywhere.herokuapp.com/corsdemo

const apiKey = 'VsyqYIWsJftaarAVK2-zbR9zmuqlYq9R2k6IWvNsfeOjijCE95iO6gFbkmug8KYxvggKaT5MtVOoA18synonXwHnqCyaL_cbJKwmND1xJtRZ6FYHekx_Eb_3bDNuYHYx';

const Yelp = {
    async search(term, location, sortBy) {
        const response = await fetch(`https://cors.bridged.cc/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`
                }
            }
        );
        const jsonResponse = await response.json();
        if (jsonResponse.businesses) {
            return jsonResponse.businesses.map(business => ({
                id: business.id,
                imageSrc: business.image_url,
                name: business.name,
                address: business.location.address1,
                city: business.location.city,
                state: business.location.state,
                zipCode: business.location.zip_code,
                category: business.categories[0].title,
                rating: business.rating,
                reviewCount: business.review_count,
                websiteUrl: business.url
            }));
        }
    }
};

export default Yelp;
