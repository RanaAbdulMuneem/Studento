import { useState } from "react"
import { JobFilter } from "./JobFilter"
import { JobListing } from "./JobListing"
import { JobSearch } from "./JobSearch"

export const Jobs = () => {
    const [filters, setFilters] = useState({});

    return (
        <div class="Jobs">
            <div class="container-fluid">
                <div class="row mb-2">
                  <JobSearch />  
                </div>
                <div class="row">
                    <div class="col-lg-4 col-sm-12 p-0 me-3">
                        <JobFilter setFilters={setFilters} />
                    </div>
                    <div class="col-lg col-sm-12 p-0">
                        <JobListing filters={filters}/>
                    </div>
                </div>
            </div>
        </div>
    )
}