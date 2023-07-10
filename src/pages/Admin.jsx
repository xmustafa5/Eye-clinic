import React from 'react'
import Requests from './../components/Requests';
import { Link } from 'react-router-dom';
const Admin = () => {
  return (
    <section>
    <Link  to="/requests" > 
    <button >
            Requests
        </button>
        </Link>
    </section>
  )
}

export default Admin