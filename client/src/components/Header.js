import {Link} from "react-router-dom"

function Header(){
    return(
       <header>
        <h1>
            Tutoring Session Portal
        </h1>
        <nav>
            <ul>
                <li>
                    <Link to="/students">
                        Students
                    </Link>
                </li>
                <li>
                    <Link to="sessions/add">
                        Add Student
                    </Link>
                </li>
            </ul>
        </nav>
       </header>
    )
}

export default Header