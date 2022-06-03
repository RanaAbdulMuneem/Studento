import axios from "axios"
import { useEffect, useState } from "react"
import { JobFilter } from "./JobFilter"
import { JobListing } from "./JobListing"
import { JobSearch } from "./JobSearch"

export const Jobs = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    const [saved, setSaved] = useState([]);
    const [applied, setApplied] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);

    const handleStudentData = async () => {
        axios.get('http://localhost:3001/students/'+user.id, {headers: {token: user.token}})
        .then(({data}) => {
            console.log('DATA', data);
            let saved_list = data.saved_jobs.map(job => job._id);
            let applied_list = data.applied_jobs.map(app => app.job._id);
            setSaved(saved_list);
            setApplied(applied_list);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        console.log('Use effect')
        if (user && user.type == 'student'){
            handleStudentData();
        }
        else {
            setLoading(false);
        }
    }, [loading]);


    //REPLACE WITH BOOTSTRAP LOADING
    if (loading) {
        return <h1>Loading ...</h1>
    }

    return (
        <div class="Jobs">
            <div class="container-fluid">
                <div class="row mb-2">
                  <JobSearch filters={filters} setSearch={setFilters}/>  
                </div>
                <div class="row">
                    <div class="col-lg-4 col-sm-12 p-0 me-3">
                        <JobFilter filters={filters} setFilters={setFilters} />
                    </div>
                    <div class="col-lg col-sm-12 p-0">
                        <JobListing 
                        filters={filters} 
                        user={user} 
                        savedList={saved} 
                        setSavedList={setSaved} 
                        appliedList={applied} 
                        setAppliedList={setApplied}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}