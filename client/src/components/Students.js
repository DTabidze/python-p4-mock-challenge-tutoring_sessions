import Student from "./Student"
import {useState,useEffect} from "react"

function Students(){

    const [students,setStudents]=useState([])
    const [data,setData]=useState({})
    const [errorMsgs,setErrorMsgs]=useState([])

    useEffect(()=>{
        loadStudents()
    },[])

    function loadStudents(){
        const URL="/students"
        fetch(URL)
        .then(res=>res.json())
        .then(students=>setStudents(students))
    }
    
    function handleChange(e){
        setData({...data,[e.target.name]:e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        const URL="/students"
        fetch(URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then(res=>{
            if(res.ok){
                setErrorMsgs([])
                return res.json()
            }
            else{
                res.json().then(errorMsgs=>setErrorMsgs(errorMsgs.errors))
            }
        })
        .then(newStudent=>{
            if(newStudent){
                setStudents(students=>[...students,newStudent])
            }
        })
    }

    return(
        <>
            <h1>
                Students
            </h1>
            <article className="students-div">
                {students.map(student=><Student student={student} key={student.id} />)}
            </article>
            <h2>
                Add New Student
            </h2>
            <form onSubmit={handleSubmit}>
                <p className="errors">
                    {errorMsgs.map(errorMsg=><p>{errorMsg}</p>)}
                </p>
                <div>
                    <label htmlFor="name">
                        Name:
                    </label>
                    <input type="text" name="name" onChange={handleChange} />
                </div>
                <div>
                    <input type="submit" value="add student" onChange={handleChange} />
                </div>
            </form>
        </>
    ) 
}

export default Students