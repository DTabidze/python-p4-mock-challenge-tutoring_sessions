import {useState,useEffect} from "react"

function SessionForm(){

    const [tutors,setTutors]=useState([])
    const selectedIdx=0
    const [data,setData]=useState({"tutor_id":0})
    const [newSession,setNewSession]=useState(null)
    const [errorMsgs,setErrorMsgs]=useState([])

    function loadTutors(){
        const URL="/tutors"
        fetch(URL)
        .then(res=>res.json())
        .then(tutors=>{
            setTutors(tutors)
            setData({...data,"tutor_id":tutors.length>0 ? tutors[selectedIdx].id :0})
        })
    }

    useEffect(()=>{
        loadTutors()
    },[])

    function handleChange(e){
        if(e.target.name=="student_id" && e.target.value==""){
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
        .then(res=>{
            if(res.ok){
                setErrorMsgs([])
                return res.json()
            }
            else{
                
                res.json().then(errorMsgs=>setErrorMsgs(errorMsgs.errors))
            }
        })
        .then(session=>setNewSession(session))
    }


    return(
        <>
            <form className="add-session-form" onSubmit={handleSubmit}>
                {errorMsgs.map(errorMsg=><p className="errors">{errorMsg}</p>)}
                <div>
                    <label htmlFor="student_id">
                        Student ID:
                    </label>
                    <input onChange={handleChange} type="text" name="student_id" value={data.student_id} />
                </div>
                <div>
                    <label htmlFor="tutor_id">
                        Tutor
                    </label>
                    <select name="tutor_id" onChange={handleChange}>
                        {tutors.map((tutor,i)=><option value={tutor.id} key={tutor.id} selected={i==selectedIdx ? "selected": ""}>{tutor.name}</option>)}
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