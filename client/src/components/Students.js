import Student from "./Student"
import {useState,useEffect} from "react"

function Students(){

    const [students,setStudents]=useState([])

    useEffect(()=>{
        loadStudents()
    },[])

    function loadStudents(){
        const URL="/students"
        fetch(URL)
        .then(res=>res.json())
        .then(students=>setStudents(students))
    }
    console.log(students)
    return(
        <article className="students-div">
            <h1>
                Students
            </h1>
            {students.map(student=><Student student={student} key={student.id} setStudents={setStudents} />)}
        </article>
    ) 
}

export default Students