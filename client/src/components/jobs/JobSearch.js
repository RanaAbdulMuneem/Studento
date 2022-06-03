import './JobSearch.css'
import {BsSearch} from 'react-icons/bs'
import {FaSearchLocation} from 'react-icons/fa'
import { useState } from 'react'



export const JobSearch = (props) => {

    const [value, setValue] = useState('');
    
    return (
        <div id="JobSearch" class="container-fluid py-3 component-shadow">
            <div class="row justify-content-center">
                <div class="col-sm search-keyword">
                    <div class="d-flex flex-row align-items-center">
                        <BsSearch class="me-2"/>
                        <input type="text" value={value} placeholder="Search Keyword" class="w-100 form-control search-field" onChange={(e) => setValue(e.target.value)}/>
                    </div>
                </div>
                {/* <div class="col-sm">
                    <div class="d-flex flex-row align-items-center">
                        <FaSearchLocation class="me-2"/>
                        <input type="text" placeholder="Online Job" class="w-100 form-control search-field"/>
                    </div>
                </div> */}
                <div class="col-sm-auto">
                    <button class="btn btn-primary search-button w-100" onClick={() => props.setSearch({...props.filters, search: value})}>Search</button>
                </div>
            </div>
        </div>
    )
}
