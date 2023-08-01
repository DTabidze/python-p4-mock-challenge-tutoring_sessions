import {useState,useEffect} from "react"

function SessionForm(){

    const [tutors,setTutors]=useState([])
    const [data,setData]=useState({})
    const [newSession,setNewSession]=useState(null)

    function loadTutors(){
        const URL="/tutors"
        fetch(URL)
        .then(res=>res.json())
        .then(tutors=>setTutors(tutors))
    }

    useEffect(()=>{
        loadTutors()
    },[])

    function handleChange(e){
        if(e.target.value==""){
            e.target.value=0
        }
        setData({...data,[e.target.name]:parseInt(e.target.value)})
    }

    function handleSubmit(e){
        e.preventDefault()
        const URL="/sessions"
        fetch(URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(session=>setNewSession(session))
    }


    return(
        <>
            <form className="add-session-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="studentId">
                        Student ID:
                    </label>
                    <input onChange={handleChange} type="text" name="studentId" />
                </div>
                <div>
                    <label htmlFor="tutor">
                        Tutor
                    </label>
                    <select name="tutorId" onChange={handleChange}>
                        {tutors.map(tutor=><option value={tutor.id}>tutor.name</option>)}
                    </select>
                </div>
                <div>
                    <input type="submit" value="submit" />
                </div>
            </form>
            {newSession ? <p>Session Details: {newSession.tutor.name} {newSession.datetime}</p>: null}
        </>
    )
}

export default SessionForm