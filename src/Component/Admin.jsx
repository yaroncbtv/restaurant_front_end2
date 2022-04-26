import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Pagination from 'pagination-react-hooks';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const MyPaginate = styled(ReactPaginate).attrs({
    // You can redifine classes here, if you want.
    activeClassName: 'active', // default to "disabled"
  })`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    list-style-type: none;
    padding: 0 5rem;
    li a {
      border-radius: 7px;
      padding: 0.1rem 1rem;
      border: gray 1px solid;
      cursor: pointer;
    }
    li.previous a,
    li.next a,
    li.break a {
      border-color: transparent;
    }
    li.active a {
      background-color: #0366d6;
      border-color: transparent;
      color: white;
      min-width: 32px;
    }
    li.disabled a {
      color: grey;
    }
    li.disable,
    li.disabled a {
      cursor: default;
    }
  `;
const posts = [
    {id : "1", name: "Berat 1"},
    {id : "2", name: "Berat 2"},
    {id : "3", name: "Berat 3"},
    {id : "4", name: "Berat 4"},
    {id : "5", name: "Berat 5"},
    {id : "6", name: "Berat 6"},
    {id : "1", name: "Berat 1"},
    {id : "2", name: "Berat 2"},
    {id : "3", name: "Berat 3"},
    {id : "4", name: "Berat 4"},
    {id : "5", name: "Berat 5"},
    {id : "6", name: "Berat 6"},
]

export default function BasicTextFields() {

    
    const show = (value) => {
        console.log(value)
        return(
            <li key={value.id} className="card">
            <span>{value.name}</span>         
        </li>
        )
    }

    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}
  const [currentItems, setCurrentItems] = React.useState(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);
  const [itemsPerPage] = React.useState(4);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

    
    const [currentPage, setCurrentPage] = React.useState(1);
    const pagePostsLimit = 3;

    const [header, setHeader] = React.useState("");
    const [content, setContent] = React.useState("");
    const [startOffer, setStartOffer] = React.useState("");
    const [endSale, setEndSale] = React.useState("");
    const [date, setDate] = React.useState("");
    const [time, setTime] = React.useState("");
    

    const sendDataToServer = () => {
        const dataToSend = {
            header: header,
            content: content,
            startOffer: startOffer,
            date:date,
            time:time
        }
        console.log(dataToSend)
    }

    React.useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
      }, [itemOffset, itemsPerPage]);
    return (
        <div>
      <Box
        component="form"
        sx={{
          display:'flex',
          flexDirection:'column',
          
          alignItems:'center'
        }}
        noValidate
        autoComplete="off"
      >


        <h1>Admin</h1>
        <TextField style={root} onChange={e => setHeader(e.target.value)} id="header" label="header    " variant="outlined" />
        <TextField style={root} onChange={e => setContent(e.target.value)} id="content" label="content" variant="outlined" />
        <TextField style={root} onChange={e => setStartOffer(e.target.value)} id="startOffer" label="startOffer" variant="outlined" />
        {/* <TextField style={root} onChange={e => setEndSale(e.target.value)} id="endSale" label="endSale" variant="outlined" /> */}

      <TextField
      onChange={e => setTime(e.target.value)}
      style={root}
        id="date"
        label="Order Date"
        type="date"
        defaultValue=""
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
      onChange={e => setDate(e.target.value)}
      style={root}
        id="time"
        label="Order Time"
        type="time"
        defaultValue=""
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        
      />
   

    <Button onClick={sendDataToServer} style={root} variant="contained">Add New Card</Button>
{/* 
    <Pagination
            data={posts}
            Show={show}
            displayNumber="5"
            previousText="previous"
            nextText="next"
        /> */}
        
    </Box>
    {/* <>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}} >
        <Items currentItems={currentItems} />
        </div>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </> */}
    </div>
    );
  }

  const root = {
      marginTop:'20px'
  }

  const rootDown = {
    marginTop:'20px',
    marginBottem:'20px'
}