import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client"

import './BusinessSearch.css';
import BusinessSearchResults from "./BusinessSearchResults";
// import { SearchResultsTable } from "./BusinessSearchResults";
import businesses, { business_columns, business_labels } from "./businesses";

const business_categories = businesses
    .map(b => (b.hasOwnProperty("category") ? b["category"] : null))
    .filter(c => c !== null);

const business_cities = businesses
    .map(b => (b.hasOwnProperty("city") ? b["city"] : null))
    .filter(c => c !== null);

function BusinessSearch (props) {

    // const data = props.data,
    //     error = props.error,
    //     loading = props.loading;

    const [ selectedBusinesses, setSelectedBusinesses ] = useState(businesses);
    const [ selectedCategory, setSelectedCategory ] = useState("All");
    const [ selectedCity, setSelectedCity] = useState("All");

    const BUSINESS_DETAILS_FRAGMENT = gql`
fragment businessDetails on Business {
  businessId,
  name,
  address,
  city,
  categories {
    name
  }
}
`;

    const BUSINESSES_QUERY = gql`
query BusinessesByCategory (
  $selectedCategory: String!
  $selectedCity: String!
) {
  businesses (
    where: { 
      categories_SOME: { name_CONTAINS: $selectedCategory } 
      city_CONTAINS: $selectedCity
    }
  ) {
    ...businessDetails
    
    averageStars
    
    businessMarked @client
    
    reviews {
      stars
      text
      user {
        name
      }
    }
  }
}

${BUSINESS_DETAILS_FRAGMENT}

`;

    const variables = {
        "selectedCategory": (selectedCategory === "All") ? "" : selectedCategory,
        "selectedCity": (selectedCity === "All") ? "" : selectedCity,
    };

    const { loading, error, data } = (function () {
        console.log(`useQuery({\n ${BUSINESSES_QUERY}\n})`);

//         return useQuery(gql`
// {
//   businesses (
//     where: { categories_SOME: { name_CONTAINS: "Beer" } }
//   ) {
//     businessId,
//     name,
//     address,
//     city,
//     categories {
//       name
//     }
//   }
// }
// `);
        return useQuery(
            BUSINESSES_QUERY,
            {
                variables
            });
    })();

    function changeBusinessCategory (evt) {
        if (business_categories.filter(c => evt.target.value === c).length > 0) {
            setSelectedCategory(evt.target.value);
        } else {
            setSelectedCategory("All");
        }
    }

    function filterBusinessesByCategory (x, category) {

        console.log("Category: ", category);

        const selected =  (category === "All") ?
            x :
            x.filter((b) => {
                return b.category === category;
            });

        console.log(selected);

        /* TODO: What are the most efficient ways to compare one map/list to another? */
        // if (current_selected.filter(cs => {
        //     const selection_match = (selected.filter(s => cs === s).length > 0);
        //     if (selection_match) console.log("Matched in previous selection: ", cs);
        //     else console.log("Not matched in previous selection: ", cs);
        //     return !selection_match;
        // }).length > 0) {
            updateSelectedBusinesses(selected);
        // }

        return selected;
    }

    function changeBusinessCity (evt) {
        if (business_cities.filter(c => evt.target.value === c).length > 0) {
            setSelectedCity(evt.target.value);
        } else {
            setSelectedCity("All");
        }
    }

    function filterBusinessesByCity (x, city) {

        console.log("City: ", city);

        const selected =  (city === "All") ?
            x :
            x.filter((b) => {
                return b.city === city;
            });

        console.log(selected);

        updateSelectedBusinesses(selected);

        return selected;
    }

    function getSelectedBusinesses() {
        console.log("Get selected businesses");
        console.log(selectedBusinesses);
        return selectedBusinesses;
    }

    function updateSelectedBusinesses(selected) {
        console.log("Update after selection change to selected: ", selected);
        setSelectedBusinesses(selected);
    }

    // useEffect(() => {
    //     filterBusinessesByCategory(filterBusinessesByCity(businesses, selectedCity), selectedCategory);
    // }, [ selectedCategory ]);

    // useEffect(() => {
    //     filterBusinessesByCity(filterBusinessesByCategory(businesses, selectedCategory), selectedCity);
    // }, [ selectedCity ]);

    return (<>
        <h2>Business Search</h2>
        <form>
            <label>Select Business Category&nbsp;
                <select
                    value={selectedCategory}
                    onChange={changeBusinessCategory}
                >
                    <option value={"All"}>All</option>
                    {business_categories.map((cat, i, a) =>
                        <option key={"cat-" + i.toString() + "-" + cat.toString()} value={cat}>{cat}</option>
                    )}
                </select>
            </label>

            {/*<br />*/}

            <label>
                Select Business City&nbsp;
                <select
                    value={selectedCity}
                    onChange={changeBusinessCity}
                >
                    {/*<select*/}
                    {/*    value={selectedCity}*/}
                    {/*    onChange={(event) => setSelectedCity(event.target.value)}*/}
                    {/*>*/}
                    <option value="All">All</option>
                    {/*<option value="San Mateo">San Mateo</option>*/}
                    {/*<option value="Santa Clara">Santa Clara</option>*/}
                    {/*<option value="Burlingame">Burlingame</option>*/}
                    {business_cities.map((city, i, a) =>
                        <option key={"city-" + i.toString() + "-" + city.toString()} value={city}>{city}</option>
                    )}
                </select>
            </label>

            {/*<input type="submit" value="Submit" />*/}

        </form>

        <BusinessSearchResults
            // x={getSelectedBusinesses()}
            data={data}
            error={error}
            loading={loading}
            columns={business_columns}
            labels={business_labels} />

        {/*<SearchResultsTable*/}
        {/*    x={getSelectedBusinesses()}*/}
        {/*    columns={business_columns}*/}
        {/*    labels={business_labels} />*/}
    </>);
}

export default BusinessSearch;
