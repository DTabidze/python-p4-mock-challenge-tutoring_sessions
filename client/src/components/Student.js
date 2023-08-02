import {Link,useNavigate} from "react-router-dom"

function Student({student:{id,name,sessions},setStudent}){
    
    const navigate=useNavigate()

    function handleSubmit(e){
            e.preventDefault()
            console.log(e.target.newName.value)
            const URL=`/students/${id}`
            fetch(URL,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({"name":e.target.newName.value})
            })
            .then(res=>res.json())
            .then(newStudent=>setStudent(newStudent))
    }

    function handleDelete(){
        const URL=`/students/${id}`
        fetch(URL,{
            method:"DELETE"
        })
        .then(res=>{
            if(res.ok){
                navigate("/students")
            }
            else{
                alert("Student deletion failed")
            }
        })
    }
    const editForm=<form onSubmit={handleSubmit}>
    <div>
        <label htmlFor="name">
            Name
        </label>
        <input type="text" name="newName" />
    </div>
    <div>
        <input type="submit" value="update name" />
    </div>
</form>
    const deleteBtn=<button className="delete-btn" onClick={handleDelete}>delete</button>
    let sessions_info
    if(sessions){
        if(sessions.length>0){
            sessions_info=sessions.map(session=><p>Tutor Name: {session.tutor.name} Date Time: {session.datetime}</p>)
        }
        else{
            sessions_info=<p>no tutoring sessions scheduled</p>
        }  
    }

    return(
        
            <div className="student-div">
                <Link to={`/students/${id}`}>
                    <p>
                        id : {id}
                    </p>
                    <p>
                        name: {name}
                    </p>
                    {sessions ? <h2>Tutoring Sessions</h2>: null}
                    {sessions_info}
                </Link>
                {sessions ? editForm : null}
                {sessions ? deleteBtn : null}
            </div>
        
            
    )
}

export default Student