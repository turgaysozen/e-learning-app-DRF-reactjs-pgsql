import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import Wrapper from './Wrapper'
import { UpdateUser, FindUser } from '../services';

// update user component
export default function UserEdit(props) {
    const [name, setUserName] = useState()
    const [lastname, setUserLastname] = useState()
    const [school, setUserSchool] = useState()
    const [city, setUserCity] = useState()
    const [country, setUserCountry] = useState()
    const [redirect, setRedirect] = useState(false)

    // find selected user to upload
    useEffect(() => {
        (
            async () => {
                const res = await FindUser(props.props)
                if (res.status === 200) {
                    setUserName(res.data.name)
                    setUserLastname(res.data.lastname)
                    setUserSchool(res.data.school)
                    setUserCity(res.data.city)
                    setUserCountry(res.data.country)
                }
            }
        )()
    }, [])

    // update selected user
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await UpdateUser(props.props, { name: name, lastname: lastname, school: school, city: city, country: country })
        if (res.status === 200) {
            setRedirect(true)
        } else {
            alert('Something Went Wrong!')
        }
    }

    // redirect the page if update successfull
    if (redirect) return <Redirect to="/admin/users" />

    return (
        <Wrapper>
            <form onSubmit={handleSubmit} style={{ width: '70%' }}>
                <h4>Update User</h4>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name"
                        defaultValue={name}
                        onChange={e => setUserName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" name="lastname"
                        defaultValue={lastname}
                        onChange={e => setUserLastname(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>School</label>
                    <input type="text" className="form-control" name="school"
                        defaultValue={school}
                        onChange={e => setUserSchool(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" className="form-control" name="city"
                        defaultValue={city}
                        onChange={e => setUserCity(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input type="text" className="form-control" name="country"
                        defaultValue={country}
                        onChange={e => setUserCountry(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </Wrapper>
    )
}