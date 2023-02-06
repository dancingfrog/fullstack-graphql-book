import './BusinessSearch.css';
import BusinessSearchResults from "./BusinessSearchResults";
import { SearchResultsTable } from "./BusinessSearchResults";
import businesses, { business_columns, business_labels } from "./businesses";
import React, { useEffect, useState } from "react";

const business_categories = businesses
    .map(b => (b.hasOwnProperty("category") ? b["category"] : null))
    .filter(c => c !== null);

const business_cities = businesses
    .map(b => (b.hasOwnProperty("city") ? b["city"] : null))
    .filter(c => c !== null);

function BusinessSearch (props) {

    const [ selectedBusinesses, setSelectedBusinesses ] = useState(businesses);
    const [ selectedCategory, setSelectedCategory ] = useState("All");
    const [ selectedCity, setSelectedCity] = useState("All");

    function changeBusinessCategory (evt) {
        if (business_categories.filter(c => evt.target.value === c).length > 0) {
            setSelectedCategory(evt.target.value);
        } else {
            setSelectedCategory("All");
        }
    }

    function filterBusinessesByCategory (x, category) {

        const current_selected = getSelectedBusinesses();

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

        const current_selected = getSelectedBusinesses();

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

    useEffect(() => {
        filterBusinessesByCategory(filterBusinessesByCity(businesses, selectedCity), selectedCategory);
    }, [ selectedCategory ]);

    useEffect(() => {
        filterBusinessesByCity(filterBusinessesByCategory(businesses, selectedCategory), selectedCity);
    }, [ selectedCity ]);

    return (<>
        <h2>Business Search</h2>
        <form>
            <label>Select Business Category&nbsp;
                <select
                    value={selectedCategory}
                    onChange={changeBusinessCategory}
                >
                    <option value={"All"}>All</option>
                    {/*<input*/}
                    {/*    type="checkbox"*/}
                    {/*    name="Library"*/}
                    {/*    value="Library"*/}
                    {/*    checked={ selectedCategory[0]}*/}
                    {/*    onChange={() => handleOnChange(0)}*/}
                    {/*/>*/}
                    {/*<input*/}
                    {/*    type="checkbox"*/}
                    {/*    name="Library"*/}
                    {/*    value="Library"*/}
                    {/*/>*/}
                    {/*<label>Library</label>*/}
                    {/*<option value={"Library"}>Library</option>*/}
                    {/*<input*/}
                    {/*    type="checkbox"*/}
                    {/*    name="Restaurant"*/}
                    {/*    value="Restaurant"*/}
                    {/*    checked={ selectedCategory[1]}*/}
                    {/*    onChange={() => handleOnChange(1)}*/}
                    {/*/>*/}
                    {/*<input*/}
                    {/*    type="checkbox"*/}
                    {/*    name="Restaurant"*/}
                    {/*    value="Restaurant"*/}
                    {/*/>*/}
                    {/*<label>Restaurant</label>*/}
                    {/*<option value={"Restaurant"}>Restaurant</option>*/}
                    {/*<input*/}
                    {/*    type="checkbox"*/}
                    {/*    name="Car Wash"*/}
                    {/*    value="Car Wash"*/}
                    {/*    checked={ selectedCategory[2]}*/}
                    {/*    onChange={() => handleOnChange(2)}*/}
                    {/*/>*/}
                    {/*<input*/}
                    {/*    type="checkbox"*/}
                    {/*    name="Car Wash"*/}
                    {/*    value="Car Wash"*/}
                    {/*/>*/}
                    {/*<label>Car Wash</label>*/}
                    {/*<option value={"Car Wash"}>Car Wash</option>*/}
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
            x={getSelectedBusinesses()}
            columns={business_columns}
            labels={business_labels} />

        {/*<SearchResultsTable*/}
        {/*    x={getSelectedBusinesses()}*/}
        {/*    columns={business_columns}*/}
        {/*    labels={business_labels} />*/}
    </>);
}

export default BusinessSearch;
