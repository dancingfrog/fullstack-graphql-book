import React, { useState } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import mockPostsDb from '../data/mockPostsDB';

class PostTable extends React.Component {

    constructor (props) {
        super(props);
        this.columns = props.columns;
        this.labels = props.labels;
        this.rows = props.rows;
    }

    /** componentDidUpdate() hook explained in https://www.youtube.com/watch?v=0o_6gztfG8c
     *
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate (prevProps, prevState, snapshot) {
        console.log("PostTable prevProps:", prevProps);

        if (prevProps !== this.props) {
            console.log("Props have changed:", this.props);
            this.columns = this.props.columns;
            this.labels = this.props.labels || null;
            this.rows = this.props.rows;
            this.forceUpdate(); // <- !
        } else {
            console.log("Props are the same:", this.props)
        }

    }

    getLabel (col) {
        return (this.labels.hasOwnProperty(col)) ?
            this.labels[col] : col;
    }

    getValue (row, col) {
        return (row.hasOwnProperty(col)) ?
            row[col] : "";
    }

    createCell (row, col, i) {
        console.log(i.toString() + "-" + col.toString(), ":", this.getValue(row, col));
        return (col.match("name") !== null) ?
            <TableCell key={i.toString() + "-" + col.toString()} component="th" scope="row">{this.getValue(row, col)}</TableCell> :
            <TableCell key={i.toString() + "-" + col.toString()} align="center">{this.getValue(row, col)}</TableCell>
    }

    createRowKey (row, col, i) {
        return (row.hasOwnProperty(col)) ?
            i.toString() + "-" + row[col] : i.toString();
    }

    render () {
        return (
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="caption table">
                    {/*<caption>A basic table example with a caption</caption>*/}
                    <TableHead>
                        {(this.labels !== null)?
                            <TableRow>
                                {this.columns.map((col) =>
                                    (col.match("user-post") !== null) ?
                                        <TableCell key={col.toString()}>{this.getLabel(col)}</TableCell> :
                                        <TableCell align="right" key={col.toString()}>{this.getLabel(col)}</TableCell>
                                )}
                            </TableRow> :
                            <TableRow></TableRow>
                        }
                    </TableHead>
                    <TableBody>
                        {this.rows.map((row, i, a) => (
                            // <TableRow>
                            <TableRow key={this.createRowKey(row, this.columns[0], i)}>
                                {this.columns.map((col) =>
                                    this.createCell(row, col, i)
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

/** PostsFeed
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function PostsFeed (props) {

    const [ posts, setPosts ] = useState(mockPostsDb.posts);

    return (<>
        <div className="content">
            {(posts !== null && posts.length > 0) ?
                <div className="feed">
                    <Table></Table>
                    { posts.map((post, i) => {

                        const
                            table_columns = [ "user-post" ],
                            table_labels = {
                                "user-post": post.user.username
                            },
                            table_rows = [
                                {
                                    "user-post": post.text
                                }
                            ];

                        return (
                            <div key={post.id} className="post">
                                <PostTable  columns={table_columns} labels={table_labels} rows={table_rows} />
                                {/*<div className="header">*/}
                                {/*    <img src={post.user.avatar} />*/}
                                {/*    <h4>{post.user.username}:</h4>*/}
                                {/*    <p className="content">*/}
                                {/*        {post.text}*/}
                                {/*    </p>*/}
                                {/*</div>*/}
                            </div>
                        );
                    }) }
                </div> :
                <div className="feed"></div>
            }
        </div>
    </>)
}

export default PostsFeed;
