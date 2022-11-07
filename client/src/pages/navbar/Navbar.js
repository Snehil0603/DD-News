import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import axios from "axios"
import Search from "../search/Search"

export default function App() {
  const [showBasic, setShowBasic] = useState(false);
  const [message, setMessage] = useState('');
  const [news,showNews]=useState(false);

       
    function changeMessage(event){
        event.preventDefault();
        setMessage(event.target.value);      
      }

      function handleSubmit(){   
        showNews(true)  ;
        window.location.href='search'
      }

  return (
    <>
    <MDBNavbar expand='lg' light bgColor='transparent' >
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>
        <img
              src='https://i.postimg.cc/DZTXLt3H/img-logo.jpg'
              height='70'
              alt=''
              loading='lazy'
            />
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='#' className='text-white text-lg'>
                Daily Dose
              </MDBNavbarLink>
            </MDBNavbarItem>
           
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/favorite' className='text-white text-lg'>
                Favorite
              </MDBNavbarLink>
            </MDBNavbarItem>

           
          </MDBNavbarNav>
          
          <form className='d-flex  mb-auto flex-row'  >
            <input type='search' className='form-control' placeholder='Search news' aria-label='Search'  onChange={event => changeMessage(event)}/>
           <a href="/search" ><MDBBtn color='success' onClick={handleSubmit} >Search</MDBBtn></a>
            
           </form>
          
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    <Search message={message} news={news}/>
    </>
    
  );
}