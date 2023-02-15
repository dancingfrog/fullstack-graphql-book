import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { setMarkedBusinesses } from "./markedBusinesses";

// class SearchResultsTable extends React.Component {
//
//     constructor (props) {
//         super(props);
//         this.props = props;
//         this.data = props.x;
//         this.columns = props.columns;
//         this.labels = props.labels;
//
//         console.log("SearchResultsTable: ", this.data);
//
//         this.getLabel = this.getLabel.bind(this);
//         this.getValue = this.getValue.bind(this);
//         this.createCell = this.createCell.bind(this);
//         this.createRowKey = this.createRowKey.bind(this);
//     }
//
//     /** componentDidUpdate() hook explained in https://www.youtube.com/watch?v=0o_6gztfG8c
//      *
//      * @param prevProps
//      * @param prevState
//      * @param snapshot
//      */
//     componentDidUpdate (prevProps, prevState, snapshot) {
//         console.log("SearchResultsTable prevProps:", prevProps);
//
//         if (prevProps !== this.props) {
//             console.log("Props have changed:", this.props);
//             this.data = this.props.x;
//             this.columns = this.props.columns;
//             this.labels = this.props.labels;
//             this.forceUpdate(); // <- !
//         } else {
//             console.log("Props are the same:", this.props)
//         }
//
//     }
//
//     getLabel (col) {
//         return (this.labels.hasOwnProperty(col)) ?
//             this.labels[col] : col;
//     }
//
//     getValue (row, col) {
//         return (row.hasOwnProperty(col)) ?
//             (col === 'categories') ?
//                 row['categories'].reduce((acc, c, i) => {
//                     return acc + (i === 0 ? " ": ", ") + c.name
//                 }, " ") :
//                 row[col] : "NA";
//     }
//
//     createCell (row, col, i) {
//         // console.log(i.toString() + "-" + col.toString(), ":", this.getValue(row, col));
//         return (col.toString() === "name") ?
//             <TableCell key={i.toString() + "-" + col.toString()} component="th" scope="row">{this.getValue(row, col)}</TableCell> :
//             <TableCell key={i.toString() + "-" + col.toString()} align="right">{this.getValue(row, col)}</TableCell>
//     }
//
//     createRowKey (row, col, i) {
//         return (row.hasOwnProperty(col)) ?
//             i.toString() + "-" + row[col] : i.toString();
//     }
//
//     render () {
//         return (
//             <TableContainer component={Paper}>
//                 <Table sx={{minWidth: 650}} aria-label="caption table">
//                     <caption>A basic table example with a caption</caption>
//                     <TableHead>
//                         <TableRow>
//                             {this.columns.map((col) =>
//                                 (col.toString() === "name") ?
//                                     <TableCell key={col.toString()}>{this.getLabel(col)}</TableCell> :
//                                     <TableCell align="right" key={col.toString()}>{this.getLabel(col)}</TableCell>
//                             )}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {this.data.map((row, i, a) => (
//                             // <TableRow>
//                             <TableRow key={this.createRowKey(row, this.columns[0], i)}>
//                                 {this.columns.map((col) =>
//                                     this.createCell(row, col, i)
//                                 )}
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         );
//     }
// }

/** SearchResultsTable
 *  Modern React development prefers functional components; easier to work with; fewer bugs
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function SearchResultsTable (props) {

    const data = props.x,
        columns = props.columns,
        labels = props.labels;

    console.log("SearchResultsTable: ", data);

    /* TODO: Assuming markedBusinesses is a (linked) list, create functions:
     *  * isEmpty(list): is the list empty?
     *  * getSize(list): return the length of the list
     *  * addItem(list, item): add item and return the length of the list
     *  * findItem(list, item): return the position/index of the given item
     *  * deleteItem(list, item): remove the given item from the list and return the position
     */
    const markedBusinesses = setMarkedBusinesses();

    function getLabel (col) {
        return (labels.hasOwnProperty(col)) ?
            labels[col] : col;
    }

    function getValue (row, col) {
        return (row.hasOwnProperty(col)) ?
            (col === 'categories') ?
                row['categories'].reduce((acc, c, i) => {
                    return acc + (i === 0 ? " ": ", ") + c.name
                }, " ") :
            row[col] : "NA";
    }

    function createCell (row, col, i) {
        // console.log(i.toString() + "-" + col.toString(), ":", getValue(row, col));
        return (col.toString() === "name") ? (
                <TableCell key={i.toString() + "-" + col.toString()} component="th" scope="row"
                           style={getValue(row, "businessMarked") ? { fontWeight: "bold" } : null} >{
                    getValue(row, col)
                }</TableCell>
            ):
            (col.toString() === "marked") ? (
                <TableCell key={i.toString() + "-" + col.toString()} component="th" scope="row">
                    <button onClick={() => {
                        /* TODO: What's the best way to filter/sort the markedBusinesses list/vector? */
                        return getValue(row, "businessMarked") ?
                            /* TODO: What's the best way to find/delete a node from the markedBusinesses list/vector? */
                            setMarkedBusinesses([ ...markedBusinesses ]) : // <- TODO: delete by businessId
                            setMarkedBusinesses([ ...markedBusinesses, getValue(row, "businessId") ])
                    }}>
                    Mark
                    </button>
                </TableCell>

            ): (
                <TableCell key={i.toString() + "-" + col.toString()} align="right">{
                    getValue(row, col)
                }</TableCell>
            );
    }

    function createRowKey (row, col, i) {
        return (row.hasOwnProperty(col)) ?
            i.toString() + "-" + row[col] : i.toString();
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="caption table">
                <caption>A basic table example with a caption</caption>
                <TableHead>
                    <TableRow>
                        {columns.map((col) =>
                            (col.toString() === "name" || col.toString() === "marked") ?
                                <TableCell key={col.toString()}>{getLabel(col)}</TableCell> :
                                <TableCell align="right" key={col.toString()}>{getLabel(col)}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, i, a) => (
                        // <TableRow>
                        <TableRow key={createRowKey(row, columns[0], i)}>
                            {columns.map((col) =>
                                createCell(row, col, i)
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export { SearchResultsTable };


/** BusinessSearchResults
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function BusinessSearchResults (props) {
    const data = props.data,
        error = props.error,
        loading = props.loading,
        business_columns = props.columns,
        business_labels = props.labels;

    console.log("BusinessSearchResults: ", data);

    if (!!error) return <p>Error</p>;
    else if (!!loading) return <p>Loading...</p>;
    else return (
        <div>
            <h3>Business Search Results</h3>
            <SearchResultsTable x={data.businesses} columns={business_columns} labels={business_labels} />
        </div>
    );
}

export default BusinessSearchResults;
