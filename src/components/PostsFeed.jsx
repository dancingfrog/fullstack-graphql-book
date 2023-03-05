import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import debounce from 'lodash/debounce';
import { Table } from "@mui/material";
import { TableBody } from "@mui/material";
import { TableCell } from "@mui/material";
import { TableContainer } from "@mui/material";
import { TableHead } from "@mui/material";
import { TableRow } from "@mui/material";
import { Paper } from "@mui/material";

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
                                        <TableCell align="right" key={col.toString()}>{
                                            (col.match("user-avatar") !== null) ?
                                                <img src={this.getLabel(col)} width="50" height="50" /> :
                                                this.getLabel(col)
                                        }</TableCell>
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

    const POSTS_QUERY = gql`{
        posts {
            id
            text
            user {
                id
                username
                avatar
            }
        }
    }`

    const { loading, error, data } = useQuery(POSTS_QUERY);
    const [ posts, setPosts ] = useState(data || mockPostsDb.posts);
    const setPostsDebounced = debounce(setPosts);

    useEffect(() => {
        console.log("data:", data);
        if (!!data && data.hasOwnProperty("posts")) {
            setPostsDebounced(data.posts);
        }
    }, [ data ]);

    function getPostsRowsData() {
        console.log("posts data: ", data);
        console.log("loading: ", loading);
        return true;
    }

    function getPostsRowsError() {
        console.log("posts data: ", data);
        console.log("error: ", error);
        return true;
    }

    return (<>
        <div className="content">
            {(error && getPostsRowsError()) ? (
                    <div>
                        GraphQL Error: ${error.message}
                    </div>
                ) :
                (!loading && getPostsRowsData()) ?
                <div className="feed">
                    { posts.map((post, i) => {
                    {/*{ data.map((post, i) => {*/}

                        const
                            table_columns = [ "user-post", "user-avatar" ],
                            table_labels = {
                                "user-post": post.user.username,
                                "user-avatar": post.user.avatar || "images/party.gif"
                            },
                            table_rows = [
                                {
                                    "user-post": post.text,
                                    // "user-avatar": post.user.avatar || "images/party.gif"
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
