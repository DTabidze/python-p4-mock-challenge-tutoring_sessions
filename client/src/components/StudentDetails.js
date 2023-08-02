import {useParams,useNavigate} from "react-router-dom"
import {useState,useEffect} from "react"
import Student from "./Student"

function StudentDetails(){

    const {studentId}=useParams()
    const navigate=useNavigate()
    const [student,setStudent]=useState({})


    useEffect(()=>{
        loadStudent()
    },[])

    function loadStudent(){
        const URL=`/students/${studentId}`
        fetch(URL)
        .then(res=>{
            if(res.ok) return res.json()
            navigate("/students")
        })
        .then(student=>setStudent(student))
    }

    return(
        <>
            <h1>
                Student Info
            </h1>
            <article className="student-details-div">
                <Student student={student} setStudent={setStudent} />
            </article>
        </>
    )

}

export default StudentDetails