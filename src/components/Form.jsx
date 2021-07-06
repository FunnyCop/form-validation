import React, { useReducer } from "react"

import "bootstrap/dist/css/bootstrap.min.css"

import "./Form.css"

const initialState = {
    firstName : { value : "", error : false },
    lastName : { value : "", error : false },
    email : { value : "", error : false }
}

const reducer = ( state, action ) => {
    return {
        ...state,
        [ action.type ] : action.payload
    }
}

const Form = () => {
    const [ state, dispatch ] = useReducer( reducer, initialState )

    const handleSubmit = e => {
        e.preventDefault()
    }

    const handleChange = e => {
        const { name, value } = e.target
        const payload = { value : value, error : false }

        if ( name === "firstName" || name === "lastName" ) {
            value.length < 3
                ? payload.error = true
                : payload.error = false
        }

        const emailRegex = /^[a-zA-z0-9_]+[@][a-zA-z0-9_]+[.][a-zA-z0-9_]+$/

        if ( name === "email" ) {
            emailRegex.test(value)
                ? payload.error = false
                : payload.error = true
        }

        dispatch( {
            type : name,
            payload : payload
        } )
    }

    return (
        <form
            className = "Form, form-group"
            onSubmit = { handleSubmit }
        >

            <span>
                <label htmlFor = "firstName">First Name</label>

                <input
                    className = "form-control"
                    type = "text"
                    name = "firstName"
                    value = { state.firstName.value }
                    onChange = { handleChange }
                />
            </span>

            {
                state.firstName.error
                    ? <p className = "error">First Name must have at least three characters</p>
                    : null
            }

            <span>
                <label htmlFor = "lastName">Last Name</label>

                <input
                    className = "form-control"
                    type = "text"
                    name = "lastName"
                    value = { state.lastName.value }
                    onChange = { handleChange }
                />
            </span>

            {
                state.lastName.error
                    ? <p className = "error">Last Name must have at least three characters</p>
                    : null
            }

            <span>
                <label htmlFor = "email">Email</label>

                <input
                    className = "form-control"
                    type = "text"
                    name = "email"
                    value = { state.email.value }
                    onChange = { handleChange }
                />
            </span>

            {
                state.email.error
                    ? <p className = "error">Email must be a valid format</p>
                    : null
            }
        </form>
    )
}

export default Form