function Student({student:{id,name,sessions},setStudents}){
    
    function handleSubmit(e){
        e.preventDefault()
        const URL=`/students/${id}`
        fetch(URL,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({[e.target.name]:e.target.value})
        })
        .then(res=>res.json())
        .then(newStudent=>setStudents(students=>students.map(student=>{
            if(student.id==newStudent.id){
                student.name=newStudent.name
            }
            return student
        })))
    }

    function handleDelete(){
        const URL=`/students/${id}`
        fetch(URL,{
            method:"DELETE"
        })
        .then(res=>{
            if(res.ok){
                setStudents(students=>students.filter(student=>student.id!=id))
            }
            else{
                alert("Student deletion failed")
            }
        })
    }
    const editForm=<form onSubmit={handleSubmit}>
    <div>
        <label for="name">
            Name
        </label>
        <input type="text" name="name" />
    </div>
    <div>
        <input type="submit" value="add name" />
    </div>
</form>
    const deleteBtn=<button onClick={handleDelete}>x</button>
    return(
        <div className="student-div">
            <p>
                id : {id}
            </p>
            <p>
                name: {name}
            </p>
            {sessions ? <><h2>Tutoring Sessions</h2>{sessions.map(session=><p>Tutor Name: {session.tutor.name}</p>)}</> : null}
            {sessions ? editForm : null}
            {sessions ? deleteBtn : null}
        </div>
    )
}

export default Student