import { JobFilter } from "./JobFilter"
import { JobListing } from "./JobListing"
import { JobSearch } from "./JobSearch"

export const Jobs = () => {
    return (
        <div class="Jobs">
            <div class="container-fluid">
                <div class="row mb-2">
                  <JobSearch />  
                </div>
                <div class="row">
                    <div class="col-lg-4 col-sm-12 p-0 me-3">
                        <JobFilter />
                    </div>
                    <div class="col-lg col-sm-12 p-0">
                        <JobListing />
                    </div>
                </div>
            </div>
        </div>
    )
}