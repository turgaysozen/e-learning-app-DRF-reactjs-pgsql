import React, { useState, useEffect } from 'react'
import Wrapper from '../admin/Wrapper'
import { Link } from "react-router-dom";
import { axiosInstance } from '../services';

// main component, it shows courses on http://localhost:3000/
export default function Main() {
    const [courses, setCourses] = useState([])
    const [isAuth, setAuth] = useState(false)

    useEffect(() => {
        const authCheck = async () => {
            // const res = await fetch('/api/account/auth')
            // // const res_json = await res.json()
            // console.log(res)
            // axiosInstance.get('/account/auth')
            //     .then((res) => {
            //         setAuth(res.data["is_auth"])
            //         console.log(isAuth)
            //     }).catch((err) => {
            //         console.log(err)
            //     })
            console.log(localStorage.getItem("access_token"))
        }
        authCheck()
    }, [isAuth])




    useEffect(() => {
        const loadCourses = async () => {
            axiosInstance.get('/course')
                .then((res) => {
                    setCourses(res.data)
                }).catch((err) => {
                    if (err.response.status === 401) {
                         window.location.href = '/admin/login'
                    }
                })
        }
        loadCourses()
    }, [])

    return (
        <Wrapper>
            <main role="main">
                <div className="album py-5 bg-light">
                    <div className="container">
                        <h3>Courses</h3>

                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {courses.map(c => {
                                c.student_count = Math.floor(Math.random() * 50); // total enrolled student, the number created randomly
                                return (
                                    <div style={{ marginTop: '5px' }} key={c.id} className="col">
                                        <div className="card shadow-sm">
                                            <div className="card-body">
                                                <h4>{c.name}</h4>
                                                <p className="card-text">{c.description}</p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    {/* <div className="btn-group">
                                                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                                    </div> */}
                                                    <Link to={`/course/view/${c.id}`} className="btn btn-sm btn-primary">View</Link>
                                                    <small className="text-muted">Price: ${c.price}</small>
                                                    <small className="text-muted">Total Student: {c.student_count}</small>
                                                    <small className="text-muted">Date: {String(c.created).split('T')[0]}</small>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </Wrapper>

    )
}