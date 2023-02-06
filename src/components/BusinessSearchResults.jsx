import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// class SearchResultsTable extends React.Component {
//
//     constructor (props) {
//         super(props);
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
//     getLabel (col) {
//         return (this.labels.hasOwnProperty(col)) ?
//             this.labels[col] : col;
//     }
//
//     getValue (row, col) {
//         return (row.hasOwnProperty(col)) ?
//             row[col] : "NA";
//     }
//
//     createCell (row, col, i) {
//         // console.log(i.toString() + "-" + col.toString(), ":", this.getValue(row, col));
//         return (col.toString == "name") ?
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
//                                 (col.toString == "name") ?
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

/* TODO: Understand why this functional component version of SearchResultsTable
 * re-renders on changes to props values, but the class component ^ above does not
 */
function SearchResultsTable (props) {
    // const { businesses, business_columns, business_labels } = props;
    const data = props.x,
        columns = props.columns,
        labels = props.labels;

    console.log("SearchResultsTable: ", data);

    function getLabel (col) {
        return (labels.hasOwnProperty(col)) ?
            labels[col] : col;
    }

    function getValue (row, col) {
        return (row.hasOwnProperty(col)) ?
            row[col] : "NA";
    }

    function createCell (row, col, i) {
        // console.log(i.toString() + "-" + col.toString(), ":", getValue(row, col));
        return (col.toString == "name") ?
            <TableCell key={i.toString() + "-" + col.toString()} component="th" scope="row">{getValue(row, col)}</TableCell> :
            <TableCell key={i.toString() + "-" + col.toString()} align="right">{getValue(row, col)}</TableCell>
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
                            (col.toString == "name") ?
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


function BusinessSearchResults (props) {
    const businesses = props.x,
        business_columns = props.columns,
        business_labels = props.labels;

    console.log("BusinessSearchResults: ", businesses);

    return (
        <div>
            <h3>Business Search Results</h3>
            <SearchResultsTable x={businesses} columns={business_columns} labels={business_labels} />
        </div>
    );
}

export default BusinessSearchResults;
